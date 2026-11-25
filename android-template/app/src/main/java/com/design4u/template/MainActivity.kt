package com.design4u.template

import android.annotation.SuppressLint
import android.app.DownloadManager
import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.content.res.ColorStateList
import android.graphics.Bitmap
import android.graphics.Color
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.net.Uri
import android.os.Bundle
import android.os.Environment
import android.view.Menu
import android.view.View
import android.webkit.CookieManager
import android.webkit.JavascriptInterface
import android.webkit.URLUtil
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.design4u.template.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var config: AppConfig
    private lateinit var connectivityManager: ConnectivityManager

    private var filePathCallback: ValueCallback<Array<Uri>>? = null
    private var lastLiveUrl: String = ""
    private var isViewingOfflineFallback: Boolean = false
    private var isExplicitOfflineTab: Boolean = false
    private var networkCallbackRegistered: Boolean = false

    private val fileChooserLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        val callback = filePathCallback
        filePathCallback = null
        if (callback == null) return@registerForActivityResult

        if (result.resultCode == RESULT_OK && result.data != null) {
            val data = result.data!!
            val uris = mutableListOf<Uri>()
            val clipData = data.clipData
            if (clipData != null) {
                for (i in 0 until clipData.itemCount) {
                    clipData.getItemAt(i).uri?.let { uris.add(it) }
                }
            } else {
                data.data?.let { uris.add(it) }
            }
            callback.onReceiveValue(if (uris.isNotEmpty()) uris.toTypedArray() else null)
        } else {
            callback.onReceiveValue(null)
        }
    }

    private val networkCallback = object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network: Network) {
            runOnUiThread {
                binding.offlineBanner.visibility = View.GONE
                if (isViewingOfflineFallback && !isExplicitOfflineTab) {
                    val target = lastLiveUrl.ifBlank { config.websiteUrl }
                    isViewingOfflineFallback = false
                    binding.webView.loadUrl(target)
                }
            }
        }

        override fun onLost(network: Network) {
            runOnUiThread {
                if (!isNetworkAvailable()) {
                    handleConnectionLost()
                }
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        config = AppConfig.load(this)
        lastLiveUrl = config.websiteUrl
        connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

        applyThemeColors()
        configureWebView()
        configureSwipeRefresh()
        configureBottomNavigation()
        configureBackNavigation()
        registerNetworkMonitor()

        loadInitialDestination()
    }

    private fun applyThemeColors() {
        try {
            window.statusBarColor = Color.parseColor(config.statusBarColor)
        } catch (_: IllegalArgumentException) {
            // Keep default theme status bar color
        }
        try {
            val primary = Color.parseColor(config.primaryColor)
            val inactive = ContextCompat.getColor(this, R.color.navInactive)
            val states = arrayOf(
                intArrayOf(android.R.attr.state_checked),
                intArrayOf(-android.R.attr.state_checked)
            )
            val colors = intArrayOf(primary, inactive)
            val colorStateList = ColorStateList(states, colors)
            binding.bottomNav.itemIconTintList = colorStateList
            binding.bottomNav.itemTextColor = colorStateList
            binding.swipeRefresh.setColorSchemeColors(primary)
        } catch (_: IllegalArgumentException) {
            // Keep default tint
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun configureWebView() {
        val webView = binding.webView
        with(webView.settings) {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            loadWithOverviewMode = true
            useWideViewPort = true
            builtInZoomControls = false
            displayZoomControls = false
            setSupportMultipleWindows(false)
            mixedContentMode = WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE
            cacheMode = if (isNetworkAvailable()) WebSettings.LOAD_DEFAULT else WebSettings.LOAD_CACHE_ELSE_NETWORK
        }

        CookieManager.getInstance().setAcceptCookie(true)
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true)

        webView.addJavascriptInterface(Design4UJsBridge(), "Design4U")

        webView.setDownloadListener { url, userAgent, contentDisposition, mimeType, _ ->
            handleDownload(url, userAgent, contentDisposition, mimeType)
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                if (newProgress in 1..99) {
                    binding.webProgressBar.visibility = View.VISIBLE
                    binding.webProgressBar.progress = newProgress
                } else {
                    binding.webProgressBar.visibility = View.GONE
                }
            }

            override fun onShowFileChooser(
                webView: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                this@MainActivity.filePathCallback?.onReceiveValue(null)
                this@MainActivity.filePathCallback = filePathCallback

                return try {
                    val intent = fileChooserParams?.createIntent()
                        ?: Intent(Intent.ACTION_GET_CONTENT).apply {
                            addCategory(Intent.CATEGORY_OPENABLE)
                            type = "*/*"
                        }
                    fileChooserLauncher.launch(intent)
                    true
                } catch (_: ActivityNotFoundException) {
                    this@MainActivity.filePathCallback = null
                    Toast.makeText(this@MainActivity, R.string.app_not_installed, Toast.LENGTH_SHORT).show()
                    false
                }
            }
        }

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val uri = request?.url ?: return false
                return handleUrlNavigation(uri)
            }

            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                if (url != null && !url.startsWith("file:///android_asset/")) {
                    lastLiveUrl = url
                    isViewingOfflineFallback = false
                }
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                binding.swipeRefresh.isRefreshing = false
                binding.webProgressBar.visibility = View.GONE
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                if (request?.isForMainFrame == true) {
                    val failingUrl = request.url?.toString().orEmpty()
                    if (!failingUrl.startsWith("file:///android_asset/")) {
                        binding.swipeRefresh.isRefreshing = false
                        loadOfflineFallback()
                    }
                }
            }
        }
    }

    private fun handleUrlNavigation(uri: Uri): Boolean {
        val url = uri.toString()
        val scheme = uri.scheme?.lowercase().orEmpty()

        if (scheme == "file" && url.startsWith("file:///android_asset/")) {
            return false
        }

        val isWhatsAppWeb = url.startsWith("https://wa.me/", ignoreCase = true) ||
            url.startsWith("https://api.whatsapp.com/", ignoreCase = true)

        if (isWhatsAppWeb || scheme in setOf("whatsapp", "tel", "mailto", "sms", "geo", "market", "intent")) {
            openExternalIntent(uri)
            return true
        }

        if (scheme != "http" && scheme != "https") {
            openExternalIntent(uri)
            return true
        }

        if (!isNetworkAvailable()) {
            lastLiveUrl = url
            loadOfflineFallback()
            return true
        }

        return false
    }

    private fun openExternalIntent(uri: Uri) {
        try {
            val intent = if (uri.scheme == "intent") {
                Intent.parseUri(uri.toString(), Intent.URI_INTENT_SCHEME)
            } else {
                Intent(Intent.ACTION_VIEW, uri)
            }
            startActivity(intent)
        } catch (_: Exception) {
            Toast.makeText(this, R.string.app_not_installed, Toast.LENGTH_SHORT).show()
        }
    }

    private fun handleDownload(
        url: String,
        userAgent: String,
        contentDisposition: String,
        mimeType: String
    ) {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            Toast.makeText(this, R.string.app_not_installed, Toast.LENGTH_SHORT).show()
            return
        }
        try {
            val fileName = URLUtil.guessFileName(url, contentDisposition, mimeType)
            val request = DownloadManager.Request(Uri.parse(url)).apply {
                setMimeType(mimeType)
                val cookies = CookieManager.getInstance().getCookie(url)
                if (!cookies.isNullOrEmpty()) {
                    addRequestHeader("cookie", cookies)
                }
                addRequestHeader("User-Agent", userAgent)
                setDescription(getString(R.string.app_name))
                setTitle(fileName)
                setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName)
            }
            val dm = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
            dm.enqueue(request)
            Toast.makeText(this, "${getString(R.string.download_started)}: $fileName", Toast.LENGTH_SHORT).show()
        } catch (_: Exception) {
            openExternalIntent(Uri.parse(url))
        }
    }

    private fun configureSwipeRefresh() {
        binding.swipeRefresh.setOnChildScrollUpCallback { _, _ ->
            binding.webView.scrollY > 0
        }
        binding.swipeRefresh.setOnRefreshListener {
            if (isExplicitOfflineTab) {
                binding.webView.reload()
            } else if (isNetworkAvailable()) {
                val target = if (isViewingOfflineFallback) {
                    lastLiveUrl.ifBlank { config.websiteUrl }
                } else {
                    binding.webView.url ?: config.websiteUrl
                }
                isViewingOfflineFallback = false
                binding.offlineBanner.visibility = View.GONE
                binding.webView.loadUrl(target)
            } else {
                binding.swipeRefresh.isRefreshing = false
                loadOfflineFallback()
            }
        }
    }

    private fun configureBottomNavigation() {
        if (!config.bottomNavEnabled || config.tabs.isEmpty()) {
            binding.bottomNav.visibility = View.GONE
            return
        }

        binding.bottomNav.visibility = View.VISIBLE
        val menu = binding.bottomNav.menu
        menu.clear()

        config.tabs.forEachIndexed { index, tab ->
            val menuItem = menu.add(Menu.NONE, index, index, tab.label)
            menuItem.setIcon(resolveNavIcon(tab.icon))
        }

        binding.bottomNav.setOnItemSelectedListener { item ->
            val tab = config.tabs.getOrNull(item.itemId) ?: return@setOnItemSelectedListener false
            loadTabTarget(tab)
            true
        }
    }

    private fun resolveNavIcon(iconKey: String): Int {
        return when (iconKey.lowercase()) {
            "info", "about" -> R.drawable.ic_nav_info
            "services", "grid" -> R.drawable.ic_nav_services
            "contact", "mail" -> R.drawable.ic_nav_contact
            "web", "globe" -> R.drawable.ic_nav_web
            "shop", "cart" -> R.drawable.ic_nav_shop
            "search" -> R.drawable.ic_nav_search
            "settings" -> R.drawable.ic_nav_settings
            else -> R.drawable.ic_nav_home
        }
    }

    private fun loadTabTarget(tab: NavTabConfig) {
        if (tab.targetType.equals("offline", ignoreCase = true)) {
            val file = tab.target.ifBlank { "index.html" }.removePrefix("/")
            isExplicitOfflineTab = true
            isViewingOfflineFallback = false
            binding.offlineBanner.visibility = View.GONE
            binding.webView.loadUrl("file:///android_asset/offline/$file")
            return
        }

        isExplicitOfflineTab = false
        val url = tab.target.ifBlank { config.websiteUrl }
        lastLiveUrl = url
        if (isNetworkAvailable()) {
            isViewingOfflineFallback = false
            binding.offlineBanner.visibility = View.GONE
            binding.webView.loadUrl(url)
        } else {
            loadOfflineFallback()
        }
    }

    private fun loadInitialDestination() {
        val firstTab = if (config.bottomNavEnabled) config.tabs.firstOrNull() else null
        if (firstTab != null) {
            loadTabTarget(firstTab)
        } else if (isNetworkAvailable()) {
            isExplicitOfflineTab = false
            isViewingOfflineFallback = false
            binding.webView.loadUrl(config.websiteUrl)
        } else {
            loadOfflineFallback()
        }
    }

    private fun handleConnectionLost() {
        if (!isExplicitOfflineTab) {
            loadOfflineFallback()
        }
    }

    private fun loadOfflineFallback() {
        isViewingOfflineFallback = true
        binding.offlineBanner.visibility = if (config.offlineMode) View.VISIBLE else View.GONE
        val assetFile = if (config.offlineMode) "index.html" else "offline_error.html"
        binding.webView.loadUrl("file:///android_asset/offline/$assetFile")
    }

    private fun isNetworkAvailable(): Boolean {
        val network = connectivityManager.activeNetwork ?: return false
        val caps = connectivityManager.getNetworkCapabilities(network) ?: return false
        return caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    }

    private fun registerNetworkMonitor() {
        try {
            connectivityManager.registerDefaultNetworkCallback(networkCallback)
            networkCallbackRegistered = true
        } catch (_: Exception) {
            networkCallbackRegistered = false
        }
    }

    private fun configureBackNavigation() {
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (binding.webView.canGoBack()) {
                    binding.webView.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })
    }

    override fun onDestroy() {
        if (networkCallbackRegistered) {
            try {
                connectivityManager.unregisterNetworkCallback(networkCallback)
            } catch (_: Exception) {
                // Ignore if already unregistered
            }
        }
        binding.webView.destroy()
        super.onDestroy()
    }

    inner class Design4UJsBridge {
        @JavascriptInterface
        fun retryOnline() {
            runOnUiThread {
                if (isNetworkAvailable()) {
                    isExplicitOfflineTab = false
                    isViewingOfflineFallback = false
                    binding.offlineBanner.visibility = View.GONE
                    binding.webView.loadUrl(lastLiveUrl.ifBlank { config.websiteUrl })
                } else {
                    Toast.makeText(
                        this@MainActivity,
                        "Still offline — please check your connection",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }

        @JavascriptInterface
        fun openOfflinePage(pageName: String) {
            val safeName = pageName.replace(Regex("[^a-zA-Z0-9._-]"), "")
            if (safeName.isNotEmpty()) {
                runOnUiThread {
                    isExplicitOfflineTab = true
                    binding.webView.loadUrl("file:///android_asset/offline/$safeName")
                }
            }
        }
    }
}
