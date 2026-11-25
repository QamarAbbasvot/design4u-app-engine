# Keep Design4U WebView JS bridge methods
-keepclassmembers class com.design4u.template.MainActivity$Design4UJsBridge {
    @android.webkit.JavascriptInterface <methods>;
}
-keepattributes JavascriptInterface
-keepattributes *Annotation*
