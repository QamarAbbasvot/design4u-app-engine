package com.design4u.template

import android.content.Context
import org.json.JSONObject

data class NavTabConfig(
    val label: String,
    val icon: String,
    val targetType: String, // "live" | "offline" | "url"
    val target: String
)

data class AppConfig(
    val websiteUrl: String,
    val offlineMode: Boolean,
    val splashDurationMs: Long,
    val primaryColor: String,
    val statusBarColor: String,
    val splashBackgroundColor: String,
    val bottomNavEnabled: Boolean,
    val tabs: List<NavTabConfig>
) {
    companion object {
        fun load(context: Context): AppConfig {
            return try {
                val jsonText = context.assets.open("app_config.json").bufferedReader().use { it.readText() }
                val obj = JSONObject(jsonText)
                val tabsArray = obj.optJSONArray("tabs")
                val parsedTabs = mutableListOf<NavTabConfig>()
                if (tabsArray != null) {
                    val count = minOf(tabsArray.length(), 4)
                    for (i in 0 until count) {
                        val item = tabsArray.optJSONObject(i) ?: continue
                        parsedTabs.add(
                            NavTabConfig(
                                label = item.optString("label", "Tab ${i + 1}"),
                                icon = item.optString("icon", "home"),
                                targetType = item.optString("targetType", "live"),
                                target = item.optString("target", "")
                            )
                        )
                    }
                }
                AppConfig(
                    websiteUrl = obj.optString("websiteUrl", "https://example.com").ifBlank { "https://example.com" },
                    offlineMode = obj.optBoolean("offlineMode", true),
                    splashDurationMs = obj.optLong("splashDurationMs", 2000L).coerceIn(1000L, 5000L),
                    primaryColor = obj.optString("primaryColor", "#10B981"),
                    statusBarColor = obj.optString("statusBarColor", "#0F172A"),
                    splashBackgroundColor = obj.optString("splashBackgroundColor", "#0F172A"),
                    bottomNavEnabled = obj.optBoolean("bottomNavEnabled", true),
                    tabs = parsedTabs
                )
            } catch (_: Exception) {
                AppConfig(
                    websiteUrl = "https://example.com",
                    offlineMode = true,
                    splashDurationMs = 2000L,
                    primaryColor = "#10B981",
                    statusBarColor = "#0F172A",
                    splashBackgroundColor = "#0F172A",
                    bottomNavEnabled = true,
                    tabs = listOf(
                        NavTabConfig("Home", "home", "live", "https://example.com"),
                        NavTabConfig("About", "info", "offline", "about.html"),
                        NavTabConfig("Services", "services", "offline", "services.html"),
                        NavTabConfig("Contact", "contact", "offline", "contact.html")
                    )
                )
            }
        }
    }
}
