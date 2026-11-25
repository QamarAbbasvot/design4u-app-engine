#!/usr/bin/env python3
"""Inject Design4U build payload into android-template/."""

import io
import json
import os
import re
import urllib.request
from pathlib import Path
from xml.sax.saxutils import escape

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
TEMPLATE_DIR = ROOT / "android-template"
APP_DIR = TEMPLATE_DIR / "app"
RES_DIR = APP_DIR / "src" / "main" / "res"
ASSETS_DIR = APP_DIR / "src" / "main" / "assets"
OFFLINE_DIR = ASSETS_DIR / "offline"

MIPMAP_SIZES = {
    "mdpi": 48,
    "hdpi": 72,
    "xhdpi": 96,
    "xxhdpi": 144,
    "xxxhdpi": 192,
}


def sanitize_hex(value: str, fallback: str) -> str:
    if isinstance(value, str):
        cleaned = value.strip()
        if re.fullmatch(r"#[0-9a-fA-F]{6}", cleaned):
            return cleaned.upper()
    return fallback


def sanitize_package_id(value: str) -> str:
    if isinstance(value, str):
        cleaned = value.strip().lower()
        if re.fullmatch(r"[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+", cleaned):
            return cleaned
    return "com.design4u.app"


def darken_hex(hex_color: str, factor: float = 0.72) -> str:
    h = hex_color.lstrip("#")
    r = max(0, min(255, int(int(h[0:2], 16) * factor)))
    g = max(0, min(255, int(int(h[2:4], 16) * factor)))
    b = max(0, min(255, int(int(h[4:6], 16) * factor)))
    return f"#{r:02X}{g:02X}{b:02X}"


def download_image(url: str) -> Image.Image | None:
    if not url or not re.match(r"^https?://", url.strip(), re.IGNORECASE):
        return None
    try:
        req = urllib.request.Request(
            url.strip(),
            headers={"User-Agent": "Design4U-CloudBuilder/1.0"},
        )
        with urllib.request.urlopen(req, timeout=25) as resp:
            data = resp.read()
        img = Image.open(io.BytesIO(data)).convert("RGBA")
        return img
    except Exception as exc:
        print(f"Warning: could not download image from {url}: {exc}")
        return None


def make_round_icon(square_img: Image.Image) -> Image.Image:
    size = square_img.size[0]
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size - 1, size - 1), fill=255)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(square_img, (0, 0), mask)
    return out


def install_app_icon(url: str) -> None:
    img = download_image(url)
    if img is None:
        print("Using default template launcher icon.")
        return

    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    cropped = img.crop((left, top, left + side, top + side))

    for density, px in MIPMAP_SIZES.items():
        mipmap_dir = RES_DIR / f"mipmap-{density}"
        mipmap_dir.mkdir(parents=True, exist_ok=True)
        resized = cropped.resize((px, px), Image.Resampling.LANCZOS)
        resized.save(mipmap_dir / "ic_launcher.png", format="PNG")
        make_round_icon(resized).save(mipmap_dir / "ic_launcher_round.png", format="PNG")
    print("Injected custom launcher icons across all mipmap densities.")


def install_splash_logo(url: str) -> None:
    img = download_image(url)
    if img is None:
        print("Using default template splash logo.")
        return

    drawable_dir = RES_DIR / "drawable"
    drawable_dir.mkdir(parents=True, exist_ok=True)
    xml_logo = drawable_dir / "splash_logo.xml"
    if xml_logo.exists():
        xml_logo.unlink()

    img.thumbnail((512, 512), Image.Resampling.LANCZOS)
    img.save(drawable_dir / "splash_logo.png", format="PNG")
    print("Injected custom splash_logo.png.")


def load_payload() -> dict:
    event_path = os.environ.get("GITHUB_EVENT_PATH", "")
    event_name = os.environ.get("GITHUB_EVENT_NAME", "")
    if event_path and Path(event_path).exists():
        event_data = json.loads(Path(event_path).read_text(encoding="utf-8"))
        if event_name == "repository_dispatch":
            return event_data.get("client_payload") or {}
        if event_name == "workflow_dispatch":
            inputs = event_data.get("inputs") or {}
            return {
                "build_id": os.environ.get("GITHUB_RUN_ID", "manual"),
                "app": {
                    "name": inputs.get("app_name", "Design4U App"),
                    "package_id": inputs.get("package_id", "com.design4u.app"),
                    "version_name": inputs.get("version_name", "1.0.0"),
                    "version_code": int(inputs.get("version_code", "1") or 1),
                    "primary_color": inputs.get("primary_color", "#10B981"),
                    "status_bar_color": inputs.get("status_bar_color", "#0F172A"),
                },
                "branding": {
                    "icon_url": inputs.get("icon_url", ""),
                    "splash_url": inputs.get("splash_url", ""),
                    "splash_bg_color": inputs.get("splash_bg_color", "#0F172A"),
                    "splash_tagline": inputs.get("splash_tagline", "Powered by DESIGN 4 U"),
                    "splash_duration_sec": int(inputs.get("splash_duration_sec", "2") or 2),
                },
                "navigation": {
                    "website_url": inputs.get("website_url", "https://example.com"),
                    "offline_mode": True,
                    "bottom_nav_enabled": True,
                },
            }
    return {}


def patch_build_gradle(package_id: str, version_code: int, version_name: str) -> None:
    gradle_path = APP_DIR / "build.gradle"
    content = gradle_path.read_text(encoding="utf-8")
    content = re.sub(r'applicationId\s+"[^"]+"', f'applicationId "{package_id}"', content, count=1)
    content = re.sub(r'versionCode\s+\d+', f'versionCode {version_code}', content, count=1)
    content = re.sub(r'versionName\s+"[^"]+"', f'versionName "{version_name}"', content, count=1)
    gradle_path.write_text(content, encoding="utf-8")


def write_xml_resources(
    app_name: str,
    tagline: str,
    primary_color: str,
    status_bar_color: str,
    splash_bg_color: str,
) -> None:
    values_dir = RES_DIR / "values"
    values_dir.mkdir(parents=True, exist_ok=True)

    strings_xml = f"""<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">{escape(app_name)}</string>
    <string name="splash_tagline">{escape(tagline)}</string>
    <string name="offline_banner_text">Offline Mode — Viewing Local Content</string>
    <string name="download_started">Download started</string>
    <string name="app_not_installed">No compatible app found to open this link</string>
</resources>
"""
    (values_dir / "strings.xml").write_text(strings_xml, encoding="utf-8")

    primary_dark = darken_hex(primary_color)
    colors_xml = f"""<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">{primary_color}</color>
    <color name="colorPrimaryDark">{primary_dark}</color>
    <color name="colorStatusBar">{status_bar_color}</color>
    <color name="splashBackground">{splash_bg_color}</color>
    <color name="splashText">#FFFFFF</color>
    <color name="navBackground">#0F172A</color>
    <color name="navActive">{primary_color}</color>
    <color name="navInactive">#94A3B8</color>
</resources>
"""
    (values_dir / "colors.xml").write_text(colors_xml, encoding="utf-8")


def write_offline_pages(pages: dict) -> None:
    OFFLINE_DIR.mkdir(parents=True, exist_ok=True)
    mapping = {
        "index": "index.html",
        "about": "about.html",
        "services": "services.html",
        "contact": "contact.html",
        "offline_error": "offline_error.html",
    }
    for key, filename in mapping.items():
        html = pages.get(key)
        if isinstance(html, str) and html.strip():
            (OFFLINE_DIR / filename).write_text(html, encoding="utf-8")


def main() -> None:
    payload = load_payload()
    app = payload.get("app") or {}
    branding = payload.get("branding") or {}
    navigation = payload.get("navigation") or {}
    offline_pages = payload.get("offline_pages") or {}

    build_id = str(payload.get("build_id") or os.environ.get("GITHUB_RUN_ID", "build"))
    app_name = str(app.get("name") or "Design4U App").strip() or "Design4U App"
    package_id = sanitize_package_id(str(app.get("package_id") or "com.design4u.app"))
    version_name = str(app.get("version_name") or "1.0.0").strip().replace('"', "") or "1.0.0"
    try:
        version_code = max(1, int(app.get("version_code") or 1))
    except (TypeError, ValueError):
        version_code = 1

    primary_color = sanitize_hex(app.get("primary_color", ""), "#10B981")
    status_bar_color = sanitize_hex(app.get("status_bar_color", ""), "#0F172A")
    splash_bg_color = sanitize_hex(branding.get("splash_bg_color", ""), "#0F172A")
    tagline = str(branding.get("splash_tagline") or "Powered by DESIGN 4 U").strip()

    try:
        splash_sec = max(1, min(5, int(branding.get("splash_duration_sec") or 2)))
    except (TypeError, ValueError):
        splash_sec = 2

    website_url = str(navigation.get("website_url") or "https://example.com").strip() or "https://example.com"
    offline_mode = bool(navigation.get("offline_mode", True))
    bottom_nav_enabled = bool(navigation.get("bottom_nav_enabled", True))
    tabs = navigation.get("tabs")
    if not isinstance(tabs, list):
        tabs = [
            {"label": "Home", "icon": "home", "targetType": "live", "target": website_url},
            {"label": "About", "icon": "info", "targetType": "offline", "target": "about.html"},
            {"label": "Services", "icon": "services", "targetType": "offline", "target": "services.html"},
            {"label": "Contact", "icon": "contact", "targetType": "offline", "target": "contact.html"},
        ]

    patch_build_gradle(package_id, version_code, version_name)
    write_xml_resources(app_name, tagline, primary_color, status_bar_color, splash_bg_color)
    write_offline_pages(offline_pages)

    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    app_config = {
        "websiteUrl": website_url,
        "offlineMode": offline_mode,
        "splashDurationMs": splash_sec * 1000,
        "primaryColor": primary_color,
        "statusBarColor": status_bar_color,
        "splashBackgroundColor": splash_bg_color,
        "bottomNavEnabled": bottom_nav_enabled,
        "tabs": tabs[:4],
    }
    (ASSETS_DIR / "app_config.json").write_text(json.dumps(app_config, indent=2), encoding="utf-8")

    install_app_icon(str(branding.get("icon_url") or ""))
    install_splash_logo(str(branding.get("splash_url") or ""))

    gh_output = os.environ.get("GITHUB_OUTPUT")
    if gh_output:
        with open(gh_output, "a", encoding="utf-8") as fh:
            fh.write(f"app_name={app_name}\n")
            fh.write(f"package_id={package_id}\n")
            fh.write(f"version_name={version_name}\n")
            fh.write(f"version_code={version_code}\n")
            fh.write(f"build_id={build_id}\n")

    print(f"Configured Design4U build for {app_name} ({package_id} v{version_name}+{version_code})")


if __name__ == "__main__":
    main()
