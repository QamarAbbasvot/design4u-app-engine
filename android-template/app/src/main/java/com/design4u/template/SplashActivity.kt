package com.design4u.template

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.animation.AlphaAnimation
import androidx.appcompat.app.AppCompatActivity
import com.design4u.template.databinding.ActivitySplashBinding

@SuppressLint("CustomSplashScreen")
class SplashActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySplashBinding
    private val handler = Handler(Looper.getMainLooper())
    private var navigated = false

    private val navigateRunnable = Runnable {
        if (!navigated && !isFinishing) {
            navigated = true
            startActivity(Intent(this, MainActivity::class.java))
            finish()
            @Suppress("DEPRECATION")
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySplashBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val config = AppConfig.load(this)
        applySplashColors(config.splashBackgroundColor)

        val fadeIn = AlphaAnimation(0.0f, 1.0f).apply {
            duration = 550L
            fillAfter = true
        }
        binding.splashCenterContainer.startAnimation(fadeIn)

        handler.postDelayed(navigateRunnable, config.splashDurationMs)
    }

    private fun applySplashColors(bgHex: String) {
        try {
            val bgColor = Color.parseColor(bgHex)
            binding.splashRoot.setBackgroundColor(bgColor)
            window.statusBarColor = bgColor
            window.navigationBarColor = bgColor
            val luminance = (0.299 * Color.red(bgColor) + 0.587 * Color.green(bgColor) + 0.114 * Color.blue(bgColor)) / 255.0
            val textColor = if (luminance > 0.65) Color.parseColor("#0F172A") else Color.WHITE
            binding.splashAppName.setTextColor(textColor)
            binding.splashTagline.setTextColor(textColor)
        } catch (_: IllegalArgumentException) {
            // Keep XML defaults when hex is malformed
        }
    }

    override fun onDestroy() {
        handler.removeCallbacks(navigateRunnable)
        super.onDestroy()
    }
}
