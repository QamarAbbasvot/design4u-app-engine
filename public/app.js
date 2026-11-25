(() => {
  "use strict";

  // Security: Never hardcode API keys or tokens in source files.
  const DEFAULT_GITHUB_REPO = "QamarAbbasvot/design4u-app-engine";
  const DEFAULT_GITHUB_TOKEN = "";
  const DEFAULT_IMGBB_KEY = "";
  const STORAGE_SETTINGS_KEY = "design4u_settings_v1";

  const DEFAULT_OFFLINE_PAGES = {
    index: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Home</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 18px; line-height: 1.55; }
    .hero { background: linear-gradient(135deg, #10b981, #059669); border-radius: 16px; padding: 20px; margin-bottom: 14px; color: #fff; }
    .hero h1 { font-size: 20px; margin-bottom: 6px; }
    .hero p { font-size: 13px; opacity: 0.92; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 14px; padding: 16px; margin-bottom: 12px; }
    .card h2 { font-size: 15px; color: #34d399; margin-bottom: 6px; }
    .card p { font-size: 13px; color: #cbd5e1; }
    .btn { display: inline-block; margin-top: 10px; padding: 9px 15px; background: #10b981; color: #0f172a; font-weight: 700; border-radius: 10px; border: none; font-size: 13px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="hero">
    <h1>Welcome to Our App</h1>
    <p>Fast, reliable hybrid access — available online and offline.</p>
  </div>
  <div class="card">
    <h2>Always Accessible</h2>
    <p>You are viewing the built-in offline home page. Browse About, Services, and Contact details anytime.</p>
    <button class="btn" onclick="window.Design4U ? Design4U.retryOnline() : location.reload()">Reconnect Live Site</button>
  </div>
</body>
</html>`,
    about: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>About Us</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 18px; line-height: 1.55; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 18px; margin-bottom: 12px; }
    h1 { font-size: 20px; color: #34d399; margin-bottom: 8px; }
    h2 { font-size: 15px; color: #f8fafc; margin-bottom: 6px; }
    p { font-size: 13px; color: #cbd5e1; }
  </style>
</head>
<body>
  <div class="card">
    <h1>About Us</h1>
    <p>We combine modern web speed with native Android reliability so customers can reach us anywhere.</p>
  </div>
  <div class="card">
    <h2>Our Mission</h2>
    <p>Deliver dependable mobile access even in low-connectivity environments.</p>
  </div>
</body>
</html>`,
    services: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Services</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 18px; line-height: 1.55; }
    h1 { font-size: 20px; color: #34d399; margin-bottom: 12px; }
    .item { background: #1e293b; border: 1px solid #334155; border-radius: 14px; padding: 14px; margin-bottom: 10px; }
    .item h2 { font-size: 15px; margin-bottom: 4px; color: #fff; }
    .item p { font-size: 13px; color: #94a3b8; }
  </style>
</head>
<body>
  <h1>Our Services</h1>
  <div class="item">
    <h2>24/7 Digital Catalog</h2>
    <p>Access product highlights and key guides both online and offline.</p>
  </div>
  <div class="item">
    <h2>Direct Customer Support</h2>
    <p>Reach us directly by phone, email, or WhatsApp anytime.</p>
  </div>
</body>
</html>`,
    contact: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contact Us</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 18px; line-height: 1.55; }
    h1 { font-size: 20px; color: #34d399; margin-bottom: 12px; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 16px; }
    .label { font-size: 11px; text-transform: uppercase; color: #94a3b8; }
    .value { font-size: 14px; font-weight: 600; color: #f8fafc; margin: 2px 0 12px; }
    a.action { display: inline-block; padding: 9px 14px; border-radius: 10px; background: #10b981; color: #0f172a; font-weight: 700; text-decoration: none; font-size: 13px; margin-right: 8px; }
  </style>
</head>
<body>
  <h1>Contact Us</h1>
  <div class="card">
    <div class="label">Email</div>
    <div class="value">support@example.com</div>
    <div class="label">Phone</div>
    <div class="value">+1 (555) 019-2834</div>
    <a class="action" href="mailto:support@example.com">Email Us</a>
    <a class="action" href="tel:+15550192834">Call Now</a>
  </div>
</body>
</html>`,
    offline_error: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>No Internet</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; text-align: center; }
    .box { max-width: 320px; width: 100%; background: #1e293b; border: 1px solid #334155; border-radius: 20px; padding: 24px 18px; }
    .icon { width: 56px; height: 56px; margin: 0 auto 14px; border-radius: 50%; background: rgba(239, 68, 68, 0.16); color: #f87171; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 800; }
    h1 { font-size: 18px; margin-bottom: 8px; }
    p { font-size: 13px; color: #94a3b8; margin-bottom: 18px; line-height: 1.5; }
    button { width: 100%; padding: 11px 16px; border: none; border-radius: 12px; background: #10b981; color: #0f172a; font-weight: 700; font-size: 14px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="box">
    <div class="icon">!</div>
    <h1>No Internet Connection</h1>
    <p>Please check your Wi-Fi or mobile data and try again.</p>
    <button onclick="window.Design4U ? Design4U.retryOnline() : location.reload()">Try Again</button>
  </div>
</body>
</html>`
  };

  const ICON_SVGS = {
    home: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />',
    info: '<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
    services: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />',
    contact: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />',
    web: '<path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />',
    shop: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />',
    search: '<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />',
    settings: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />'
  };

  const state = {
    currentStep: 1,
    autoPackageSync: true,
    previewMode: "splash",
    activeOfflineKey: "index",
    activeNavIndex: 0,
    settings: loadSettings(),
    app: {
      name: "Design4U Store",
      packageId: "com.design4u.design4ustore",
      versionName: "1.0.0",
      versionCode: 1,
      primaryColor: "#10B981",
      statusBarColor: "#0F172A"
    },
    branding: {
      iconUrl: "",
      splashUrl: "",
      splashBgColor: "#0F172A",
      splashTagline: "Powered by DESIGN 4 U",
      splashDurationSec: 2
    },
    navigation: {
      websiteUrl: "https://example.com",
      offlineMode: true,
      bottomNavEnabled: true,
      tabs: [
        { label: "Home", icon: "home", targetType: "live", target: "https://example.com" },
        { label: "About", icon: "info", targetType: "offline", target: "about.html" },
        { label: "Services", icon: "services", targetType: "offline", target: "services.html" },
        { label: "Contact", icon: "contact", targetType: "offline", target: "contact.html" }
      ]
    },
    offlinePages: { ...DEFAULT_OFFLINE_PAGES },
    buildTracker: {
      active: false,
      dispatchedAt: null,
      buildId: null,
      pollTimer: null,
      matchedRunId: null
    }
  };

  function $(id) {
    return document.getElementById(id);
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_SETTINGS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          githubRepo: (parsed.githubRepo || DEFAULT_GITHUB_REPO).trim(),
          githubToken: (parsed.githubToken || DEFAULT_GITHUB_TOKEN).trim(),
          imgbbKey: (parsed.imgbbKey || DEFAULT_IMGBB_KEY).trim()
        };
      }
    } catch (_) {
      // Ignore corrupt localStorage
    }
    return {
      githubRepo: DEFAULT_GITHUB_REPO,
      githubToken: DEFAULT_GITHUB_TOKEN,
      imgbbKey: DEFAULT_IMGBB_KEY
    };
  }

  function saveSettingsToStorage(settings) {
    state.settings = settings;
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
    updateTokenBadge();
  }

  function updateTokenBadge() {
    const badge = $("tokenStatusBadge");
    if (!badge) return;
    if (state.settings.githubToken) {
      badge.className = "hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
      badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-400"></span><span>GitHub Connected</span>';
    } else {
      badge.className = "hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-rose-500/30 bg-rose-500/10 text-rose-300";
      badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-rose-500"></span><span>GitHub Token Missing</span>';
    }
  }

  function cleanPackageSegment(appName) {
    let cleaned = String(appName || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 28);
    if (!cleaned || /^[0-9]/.test(cleaned)) {
      cleaned = "app" + cleaned;
    }
    return cleaned;
  }

  function isValidHex(hex) {
    return /^#[0-9a-fA-F]{6}$/.test(String(hex || "").trim());
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ---------------- Settings Modal ----------------
  function openSettingsModal(showTokenPrompt = false) {
    $("settingsGithubRepo").value = state.settings.githubRepo || DEFAULT_GITHUB_REPO;
    $("settingsGithubToken").value = state.settings.githubToken || "";
    $("settingsImgbbKey").value = state.settings.imgbbKey || "";
    $("settingsPromptBanner").classList.toggle("hidden", !showTokenPrompt);
    $("settingsModal").classList.remove("hidden");
    if (showTokenPrompt) {
      setTimeout(() => $("settingsGithubToken").focus(), 60);
    }
  }

  function closeSettingsModal() {
    $("settingsModal").classList.add("hidden");
    $("settingsPromptBanner").classList.add("hidden");
  }

  function bindSettingsEvents() {
    $("openSettingsBtn").addEventListener("click", () => openSettingsModal(false));
    $("closeSettingsBtn").addEventListener("click", closeSettingsModal);
    $("cancelSettingsBtn").addEventListener("click", closeSettingsModal);

    $("settingsModal").addEventListener("click", (e) => {
      if (e.target === $("settingsModal")) closeSettingsModal();
    });

    document.querySelectorAll("[data-toggle-vis]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = $(btn.dataset.toggleVis);
        const isPwd = input.type === "password";
        input.type = isPwd ? "text" : "password";
        btn.textContent = isPwd ? "Hide" : "Show";
      });
    });

    $("clearSettingsBtn").addEventListener("click", () => {
      saveSettingsToStorage({
        githubRepo: DEFAULT_GITHUB_REPO,
        githubToken: "",
        imgbbKey: ""
      });
      $("settingsGithubRepo").value = DEFAULT_GITHUB_REPO;
      $("settingsGithubToken").value = "";
      $("settingsImgbbKey").value = "";
    });

    $("settingsForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const repo = $("settingsGithubRepo").value.trim() || DEFAULT_GITHUB_REPO;
      const token = $("settingsGithubToken").value.trim();
      const imgbb = $("settingsImgbbKey").value.trim();
      saveSettingsToStorage({
        githubRepo: repo,
        githubToken: token,
        imgbbKey: imgbb
      });
      closeSettingsModal();
      renderBuildSummary();
    });
  }

  // ---------------- Wizard Steps ----------------
  function setStep(step) {
    state.currentStep = Math.max(1, Math.min(4, step));
    for (let i = 1; i <= 4; i++) {
      const panel = $(`stepPanel${i}`);
      const tab = document.querySelector(`.step-tab[data-step="${i}"]`);
      const num = tab.querySelector(".step-num");
      const active = i === state.currentStep;

      panel.classList.toggle("hidden", !active);
      if (active) {
        tab.className = "step-tab flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left border transition bg-emerald-500/15 border-emerald-500/50 text-white";
        num.className = "step-num w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 bg-emerald-500 text-slate-950";
      } else {
        tab.className = "step-tab flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left border transition bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200";
        num.className = "step-num w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 bg-slate-800 text-slate-300";
      }
    }

    $("currentStepLabel").textContent = String(state.currentStep);
    $("prevStepBtn").disabled = state.currentStep === 1;
    $("nextStepBtn").classList.toggle("hidden", state.currentStep === 4);

    if (state.currentStep === 4) {
      renderBuildSummary();
    }
  }

  function bindWizardEvents() {
    document.querySelectorAll(".step-tab").forEach((tab) => {
      tab.addEventListener("click", () => setStep(Number(tab.dataset.step)));
    });
    $("prevStepBtn").addEventListener("click", () => setStep(state.currentStep - 1));
    $("nextStepBtn").addEventListener("click", () => setStep(state.currentStep + 1));
  }

  // ---------------- Step 1: App Identity ----------------
  function bindColorPair(pickerId, hexId, onChange) {
    const picker = $(pickerId);
    const hex = $(hexId);

    picker.addEventListener("input", () => {
      const val = picker.value.toUpperCase();
      hex.value = val;
      onChange(val);
    });

    hex.addEventListener("input", () => {
      let val = hex.value.trim().toUpperCase();
      if (!val.startsWith("#") && /^[0-9A-F]{6}$/.test(val)) {
        val = "#" + val;
      }
      if (isValidHex(val)) {
        picker.value = val;
        onChange(val);
      }
    });
  }

  function bindStep1Events() {
    $("appName").addEventListener("input", () => {
      state.app.name = $("appName").value.trim() || "Design4U App";
      if (state.autoPackageSync) {
        const pkg = `com.design4u.${cleanPackageSegment(state.app.name)}`;
        state.app.packageId = pkg;
        $("packageId").value = pkg;
      }
      updatePhonePreview();
    });

    $("toggleAutoPkgBtn").addEventListener("click", () => {
      state.autoPackageSync = !state.autoPackageSync;
      $("toggleAutoPkgBtn").textContent = `Auto-sync: ${state.autoPackageSync ? "ON" : "OFF"}`;
      if (state.autoPackageSync) {
        const pkg = `com.design4u.${cleanPackageSegment($("appName").value)}`;
        state.app.packageId = pkg;
        $("packageId").value = pkg;
      }
    });

    $("packageId").addEventListener("input", () => {
      state.autoPackageSync = false;
      $("toggleAutoPkgBtn").textContent = "Auto-sync: OFF";
      state.app.packageId = $("packageId").value.trim().toLowerCase();
    });

    $("versionName").addEventListener("input", () => {
      state.app.versionName = $("versionName").value.trim() || "1.0.0";
    });

    $("versionCode").addEventListener("input", () => {
      state.app.versionCode = Math.max(1, parseInt($("versionCode").value, 10) || 1);
    });

    bindColorPair("primaryColorPicker", "primaryColorHex", (val) => {
      state.app.primaryColor = val;
      updatePhonePreview();
    });

    bindColorPair("statusBarColorPicker", "statusBarColorHex", (val) => {
      state.app.statusBarColor = val;
      updatePhonePreview();
    });
  }

  // ---------------- Step 2: Branding & ImgBB ----------------
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || "");
        const commaIdx = result.indexOf(",");
        resolve(commaIdx >= 0 ? result.slice(commaIdx + 1) : result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function uploadToImgBB(file, statusEl, urlInputEl, onSuccess) {
    const apiKey = state.settings.imgbbKey;
    if (!apiKey) {
      statusEl.innerHTML = '<span class="text-amber-400">ImgBB API Key is blank.</span> Paste a direct image URL above or add your key in ⚙️ Settings.';
      return;
    }

    statusEl.innerHTML = '<span class="text-emerald-400">Uploading to ImgBB...</span>';
    try {
      const base64 = await fileToBase64(file);
      const formData = new FormData();
      formData.append("image", base64);

      const resp = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`, {
        method: "POST",
        body: formData
      });
      const json = await resp.json();
      if (!resp.ok || !json.success) {
        throw new Error(json?.error?.message || "ImgBB upload failed");
      }
      const hostedUrl = json.data.url;
      urlInputEl.value = hostedUrl;
      statusEl.innerHTML = '<span class="text-emerald-400">Uploaded successfully via ImgBB!</span>';
      onSuccess(hostedUrl);
    } catch (err) {
      statusEl.innerHTML = `<span class="text-rose-400">Upload failed: ${escapeHtml(err.message)}.</span> You can paste a direct HTTPS URL instead.`;
    }
  }

  function updateBrandingThumbs() {
    const initial = (state.app.name || "D").trim().charAt(0).toUpperCase() || "D";
    $("iconThumbFallback").textContent = initial;
    $("previewHeaderInitial").textContent = initial;
    $("previewSplashInitial").textContent = initial;

    if (state.branding.iconUrl) {
      $("iconThumb").src = state.branding.iconUrl;
      $("iconThumb").classList.remove("hidden");
      $("iconThumbFallback").classList.add("hidden");
      $("previewHeaderIcon").src = state.branding.iconUrl;
      $("previewHeaderIcon").classList.remove("hidden");
      $("previewHeaderInitial").classList.add("hidden");
    } else {
      $("iconThumb").classList.add("hidden");
      $("iconThumbFallback").classList.remove("hidden");
      $("previewHeaderIcon").classList.add("hidden");
      $("previewHeaderInitial").classList.remove("hidden");
    }

    const splashSrc = state.branding.splashUrl || state.branding.iconUrl;
    if (splashSrc) {
      $("splashThumb").src = state.branding.splashUrl || "";
      $("splashThumb").classList.toggle("hidden", !state.branding.splashUrl);
      $("splashThumbFallback").classList.toggle("hidden", Boolean(state.branding.splashUrl));
      $("previewSplashImg").src = splashSrc;
      $("previewSplashImg").classList.remove("hidden");
      $("previewSplashInitial").classList.add("hidden");
    } else {
      $("splashThumb").classList.add("hidden");
      $("splashThumbFallback").classList.remove("hidden");
      $("previewSplashImg").classList.add("hidden");
      $("previewSplashInitial").classList.remove("hidden");
    }
  }

  function bindStep2Events() {
    $("iconFileInput").addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      uploadToImgBB(file, $("iconUploadStatus"), $("iconUrl"), (url) => {
        state.branding.iconUrl = url;
        updatePhonePreview();
      });
      e.target.value = "";
    });

    $("splashFileInput").addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      uploadToImgBB(file, $("splashUploadStatus"), $("splashUrl"), (url) => {
        state.branding.splashUrl = url;
        updatePhonePreview();
      });
      e.target.value = "";
    });

    $("iconUrl").addEventListener("input", () => {
      state.branding.iconUrl = $("iconUrl").value.trim();
      updatePhonePreview();
    });

    $("splashUrl").addEventListener("input", () => {
      state.branding.splashUrl = $("splashUrl").value.trim();
      updatePhonePreview();
    });

    bindColorPair("splashBgPicker", "splashBgHex", (val) => {
      state.branding.splashBgColor = val;
      updatePhonePreview();
    });

    $("splashDuration").addEventListener("input", () => {
      const sec = Math.max(1, Math.min(5, parseInt($("splashDuration").value, 10) || 2));
      state.branding.splashDurationSec = sec;
      $("splashDurationLabel").textContent = `${sec} second${sec === 1 ? "" : "s"}`;
      updatePhonePreview();
    });

    $("splashTagline").addEventListener("input", () => {
      state.branding.splashTagline = $("splashTagline").value;
      updatePhonePreview();
    });
  }

  // ---------------- Step 3: Hybrid Offline + Nav ----------------
  const OFFLINE_FILENAMES = {
    index: "index.html",
    about: "about.html",
    services: "services.html",
    contact: "contact.html",
    offline_error: "offline_error.html"
  };

  function selectOfflinePage(key) {
    state.activeOfflineKey = key;
    document.querySelectorAll(".offline-page-tab").forEach((btn) => {
      const active = btn.dataset.page === key;
      btn.className = active
        ? "offline-page-tab px-3 py-1.5 rounded-lg text-xs font-semibold border transition bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
        : "offline-page-tab px-3 py-1.5 rounded-lg text-xs font-semibold border transition bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200";
    });
    const html = state.offlinePages[key] || "";
    $("offlineHtmlEditor").value = html;
    $("editingFileLabel").textContent = `assets/offline/${OFFLINE_FILENAMES[key]}`;
    $("offlineHtmlSize").textContent = `${new Blob([html]).size} B`;
  }

  function renderNavTabsEditor() {
    const container = $("navTabsContainer");
    container.innerHTML = "";
    const enabled = state.navigation.bottomNavEnabled;
    $("addNavTabBtn").disabled = !enabled || state.navigation.tabs.length >= 4;
    $("addNavTabBtn").classList.toggle("opacity-40", $("addNavTabBtn").disabled);

    if (!enabled) {
      container.innerHTML = '<div class="text-xs text-slate-500 py-2">Bottom Navigation Bar is disabled (full-screen WebView mode).</div>';
      return;
    }

    state.navigation.tabs.forEach((tab, idx) => {
      const card = document.createElement("div");
      card.className = "p-3 rounded-xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center";

      const isOffline = tab.targetType === "offline";
      const offlineOptions = [
        ["index.html", "Home (index.html)"],
        ["about.html", "About Us (about.html)"],
        ["services.html", "Services (services.html)"],
        ["contact.html", "Contact Us (contact.html)"]
      ]
        .map(([val, lbl]) => `<option value="${val}" ${tab.target === val ? "selected" : ""}>${lbl}</option>`)
        .join("");

      const iconOptions = Object.keys(ICON_SVGS)
        .map((k) => `<option value="${k}" ${tab.icon === k ? "selected" : ""}>${k}</option>`)
        .join("");

      card.innerHTML = `
        <div class="sm:col-span-3">
          <input type="text" data-nav-field="label" data-idx="${idx}" maxlength="14" value="${escapeHtml(tab.label)}" placeholder="Label"
            class="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500" />
        </div>
        <div class="sm:col-span-2">
          <select data-nav-field="icon" data-idx="${idx}"
            class="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500">
            ${iconOptions}
          </select>
        </div>
        <div class="sm:col-span-3">
          <select data-nav-field="targetType" data-idx="${idx}"
            class="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500">
            <option value="live" ${tab.targetType === "live" ? "selected" : ""}>Live URL</option>
            <option value="offline" ${tab.targetType === "offline" ? "selected" : ""}>Offline Page</option>
          </select>
        </div>
        <div class="sm:col-span-3">
          ${
            isOffline
              ? `<select data-nav-field="target" data-idx="${idx}" class="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500">${offlineOptions}</select>`
              : `<input type="url" data-nav-field="target" data-idx="${idx}" value="${escapeHtml(tab.target)}" placeholder="https://..." class="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500" />`
          }
        </div>
        <div class="sm:col-span-1 flex justify-end">
          <button type="button" data-remove-tab="${idx}" ${state.navigation.tabs.length <= 1 ? "disabled" : ""}
            class="px-2 py-1 rounded-lg text-xs font-bold text-rose-400 hover:bg-rose-500/15 disabled:opacity-30">&times;</button>
        </div>
      `;
      container.appendChild(card);
    });

    container.querySelectorAll("[data-nav-field]").forEach((el) => {
      const eventName = el.tagName === "SELECT" ? "change" : "input";
      el.addEventListener(eventName, () => {
        const idx = Number(el.dataset.idx);
        const field = el.dataset.navField;
        const tab = state.navigation.tabs[idx];
        if (!tab) return;
        tab[field] = el.value;
        if (field === "targetType") {
          tab.target = el.value === "offline" ? "index.html" : state.navigation.websiteUrl;
          renderNavTabsEditor();
        }
        updatePhonePreview();
      });
    });

    container.querySelectorAll("[data-remove-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.removeTab);
        if (state.navigation.tabs.length > 1) {
          state.navigation.tabs.splice(idx, 1);
          if (state.activeNavIndex >= state.navigation.tabs.length) {
            state.activeNavIndex = 0;
          }
          renderNavTabsEditor();
          updatePhonePreview();
        }
      });
    });
  }

  function bindStep3Events() {
    $("websiteUrl").addEventListener("input", () => {
      const prev = state.navigation.websiteUrl;
      const next = $("websiteUrl").value.trim() || "https://example.com";
      state.navigation.websiteUrl = next;
      state.navigation.tabs.forEach((t) => {
        if (t.targetType === "live" && (t.target === prev || !t.target)) {
          t.target = next;
        }
      });
      renderNavTabsEditor();
      updatePhonePreview();
    });

    $("offlineModeToggle").addEventListener("change", () => {
      state.navigation.offlineMode = $("offlineModeToggle").checked;
      updatePhonePreview();
    });

    document.querySelectorAll(".offline-page-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectOfflinePage(btn.dataset.page);
        if (state.previewMode === "offline" || state.previewMode === "no_internet") {
          setPreviewMode(btn.dataset.page === "offline_error" ? "no_internet" : "offline");
        }
      });
    });

    $("offlineHtmlEditor").addEventListener("input", () => {
      const key = state.activeOfflineKey;
      const val = $("offlineHtmlEditor").value;
      state.offlinePages[key] = val;
      $("offlineHtmlSize").textContent = `${new Blob([val]).size} B`;
      if (state.previewMode === "offline" || state.previewMode === "no_internet") {
        updatePhonePreview();
      }
    });

    $("resetOfflinePageBtn").addEventListener("click", () => {
      const key = state.activeOfflineKey;
      state.offlinePages[key] = DEFAULT_OFFLINE_PAGES[key];
      selectOfflinePage(key);
      updatePhonePreview();
    });

    $("previewCurrentOfflineBtn").addEventListener("click", () => {
      setPreviewMode(state.activeOfflineKey === "offline_error" ? "no_internet" : "offline");
    });

    $("bottomNavToggle").addEventListener("change", () => {
      state.navigation.bottomNavEnabled = $("bottomNavToggle").checked;
      renderNavTabsEditor();
      updatePhonePreview();
    });

    $("addNavTabBtn").addEventListener("click", () => {
      if (state.navigation.tabs.length >= 4) return;
      state.navigation.tabs.push({
        label: `Tab ${state.navigation.tabs.length + 1}`,
        icon: "web",
        targetType: "offline",
        target: "index.html"
      });
      renderNavTabsEditor();
      updatePhonePreview();
    });
  }

  // ---------------- Live Phone Preview ----------------
  function setPreviewMode(mode) {
    state.previewMode = mode;
    document.querySelectorAll(".preview-mode-btn").forEach((btn) => {
      const active = btn.dataset.preview === mode;
      btn.className = active
        ? "preview-mode-btn flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold transition bg-emerald-500 text-slate-950"
        : "preview-mode-btn flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold transition text-slate-400 hover:text-white hover:bg-slate-800";
    });
    updatePhonePreview();
  }

  function updatePhonePreview() {
    updateBrandingThumbs();

    // Status bar
    $("phoneStatusBar").style.backgroundColor = state.app.statusBarColor;
    const isNoNet = state.previewMode === "no_internet";
    $("phoneSignalLabel").textContent = isNoNet ? "OFFLINE" : "5G";
    $("phoneOfflineBanner").classList.toggle("hidden", !(isNoNet && state.navigation.offlineMode));

    // Views
    $("previewSplashView").classList.toggle("hidden", state.previewMode !== "splash");
    $("previewOnlineView").classList.toggle("hidden", state.previewMode !== "online");
    $("previewOfflineView").classList.toggle(
      "hidden",
      state.previewMode !== "offline" && state.previewMode !== "no_internet"
    );

    // Splash content
    $("previewSplashView").style.backgroundColor = state.branding.splashBgColor;
    $("previewSplashTitle").textContent = state.app.name || "Design4U App";
    $("previewSplashTagline").textContent = state.branding.splashTagline || "";
    $("previewSplashDuration").textContent = `Splash: ${state.branding.splashDurationSec}s`;

    // Online content
    const activeTab = state.navigation.tabs[state.activeNavIndex];
    const activeUrl =
      activeTab && activeTab.targetType === "live" && activeTab.target
        ? activeTab.target
        : state.navigation.websiteUrl;

    $("previewHeaderAppName").textContent = state.app.name || "Design4U App";
    $("previewHeaderUrl").textContent = activeUrl;
    $("onlineNoticeUrl").textContent = activeUrl;

    if (state.previewMode === "online") {
      const frame = $("onlinePreviewFrame");
      if (frame.dataset.loadedUrl !== activeUrl) {
        frame.dataset.loadedUrl = activeUrl;
        $("onlineFrameNotice").classList.add("hidden");
        try {
          frame.src = activeUrl;
        } catch (_) {
          $("onlineFrameNotice").classList.remove("hidden");
        }
      }
    }

    // Offline HTML content
    if (state.previewMode === "offline") {
      const html = state.offlinePages[state.activeOfflineKey] || DEFAULT_OFFLINE_PAGES.index;
      $("offlinePreviewFrame").srcdoc = html;
    } else if (state.previewMode === "no_internet") {
      const html = state.navigation.offlineMode
        ? state.offlinePages.index
        : state.offlinePages.offline_error;
      $("offlinePreviewFrame").srcdoc = html;
    }

    // Bottom Navigation Bar inside phone
    const navBar = $("phoneBottomNav");
    if (!state.navigation.bottomNavEnabled || state.previewMode === "splash") {
      navBar.classList.add("hidden");
    } else {
      navBar.classList.remove("hidden");
      navBar.innerHTML = "";
      state.navigation.tabs.slice(0, 4).forEach((tab, idx) => {
        const isActive = idx === state.activeNavIndex;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "flex-1 flex flex-col items-center justify-center gap-0.5 py-1 transition";
        btn.style.color = isActive ? state.app.primaryColor : "#94A3B8";
        btn.innerHTML = `
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            ${ICON_SVGS[tab.icon] || ICON_SVGS.home}
          </svg>
          <span class="text-[10px] font-semibold truncate max-w-[68px]">${escapeHtml(tab.label)}</span>
        `;
        btn.addEventListener("click", () => {
          state.activeNavIndex = idx;
          if (tab.targetType === "offline") {
            const key = Object.keys(OFFLINE_FILENAMES).find((k) => OFFLINE_FILENAMES[k] === tab.target) || "index";
            selectOfflinePage(key);
            setPreviewMode("offline");
          } else {
            setPreviewMode("online");
          }
        });
        navBar.appendChild(btn);
      });
    }
  }

  function bindPreviewEvents() {
    document.querySelectorAll(".preview-mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => setPreviewMode(btn.dataset.preview));
    });

    $("reloadOnlinePreviewBtn").addEventListener("click", () => {
      const frame = $("onlinePreviewFrame");
      frame.dataset.loadedUrl = "";
      updatePhonePreview();
    });

    $("onlinePreviewFrame").addEventListener("error", () => {
      $("onlineFrameNotice").classList.remove("hidden");
    });
  }

  // ---------------- Step 4: Cloud Build & Tracker ----------------
  function buildClientPayload(buildId) {
    const compactHtml = (html) => String(html || "").replace(/\r\n/g, "\n").trim();
    return {
      build_id: buildId,
      app: {
        name: state.app.name,
        package_id: state.app.packageId,
        version_name: state.app.versionName,
        version_code: state.app.versionCode,
        primary_color: state.app.primaryColor,
        status_bar_color: state.app.statusBarColor
      },
      branding: {
        icon_url: state.branding.iconUrl,
        splash_url: state.branding.splashUrl,
        splash_bg_color: state.branding.splashBgColor,
        splash_tagline: state.branding.splashTagline,
        splash_duration_sec: state.branding.splashDurationSec
      },
      navigation: {
        website_url: state.navigation.websiteUrl,
        offline_mode: state.navigation.offlineMode,
        bottom_nav_enabled: state.navigation.bottomNavEnabled,
        tabs: state.navigation.tabs.slice(0, 4)
      },
      offline_pages: {
        index: compactHtml(state.offlinePages.index),
        about: compactHtml(state.offlinePages.about),
        services: compactHtml(state.offlinePages.services),
        contact: compactHtml(state.offlinePages.contact),
        offline_error: compactHtml(state.offlinePages.offline_error)
      }
    };
  }

  function renderBuildSummary() {
    const payload = buildClientPayload("preview");
    const payloadBytes = new Blob([JSON.stringify(payload)]).size;
    const kb = (payloadBytes / 1024).toFixed(1);
    const sizeBadge = $("payloadSizeBadge");
    sizeBadge.textContent = `Payload: ${kb} KB / 64 KB`;
    sizeBadge.className =
      payloadBytes > 62000
        ? "text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300"
        : "text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400";

    const items = [
      ["App Name", state.app.name],
      ["Package ID", state.app.packageId],
      ["Version", `${state.app.versionName} (Code ${state.app.versionCode})`],
      ["Live URL", state.navigation.websiteUrl],
      ["Hybrid Offline Mode", state.navigation.offlineMode ? "Enabled (Play Store Safe)" : "Fallback Only"],
      ["Bottom Nav Tabs", state.navigation.bottomNavEnabled ? `${state.navigation.tabs.length} Active Tabs` : "Disabled"],
      ["Splash Screen", `${state.branding.splashDurationSec}s (${state.branding.splashBgColor})`],
      ["Target Repo", state.settings.githubRepo || DEFAULT_GITHUB_REPO]
    ];

    $("buildSummaryGrid").innerHTML = items
      .map(
        ([k, v]) => `
        <div class="px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2">
          <span class="text-slate-400 shrink-0">${escapeHtml(k)}</span>
          <span class="font-semibold text-slate-100 truncate text-right">${escapeHtml(v)}</span>
        </div>`
      )
      .join("");
  }

  function showBuildAlert(kind, message) {
    const box = $("buildAlertBox");
    box.classList.remove("hidden");
    const styles = {
      success: "rounded-xl p-3.5 text-xs border bg-emerald-500/10 border-emerald-500/30 text-emerald-200",
      error: "rounded-xl p-3.5 text-xs border bg-rose-500/10 border-rose-500/30 text-rose-200",
      info: "rounded-xl p-3.5 text-xs border bg-slate-900 border-slate-700 text-slate-200"
    };
    box.className = styles[kind] || styles.info;
    box.textContent = message;
  }

  function githubHeaders(token) {
    const headers = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }

  async function triggerCloudBuild() {
    const repo = (state.settings.githubRepo || DEFAULT_GITHUB_REPO).trim();
    const token = (state.settings.githubToken || "").trim();

    // Critical security requirement: prompt Settings modal if token not saved
    if (!token) {
      openSettingsModal(true);
      return;
    }

    const buildId = Date.now().toString(36);
    const clientPayload = buildClientPayload(buildId);
    const bodyJson = JSON.stringify({
      event_type: "build_design4u_app",
      client_payload: clientPayload
    });

    if (new Blob([bodyJson]).size > 64500) {
      showBuildAlert("error", "Offline HTML pages exceed GitHub's 64 KB dispatch payload limit. Please shorten custom HTML slightly.");
      return;
    }

    const btn = $("generateBuildBtn");
    btn.disabled = true;
    btn.classList.add("opacity-60");
    showBuildAlert("info", `Dispatching build ${buildId} to ${repo}...`);

    try {
      const resp = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
        method: "POST",
        headers: {
          ...githubHeaders(token),
          "Content-Type": "application/json"
        },
        body: bodyJson
      });

      if (!resp.ok) {
        let errText = `HTTP ${resp.status}`;
        try {
          const errJson = await resp.json();
          if (errJson.message) errText += `: ${errJson.message}`;
        } catch (_) {
          // ignore
        }
        throw new Error(errText);
      }

      state.buildTracker.active = true;
      state.buildTracker.dispatchedAt = Date.now() - 15000;
      state.buildTracker.buildId = buildId;
      state.buildTracker.matchedRunId = null;

      showBuildAlert("success", `Cloud build triggered! Tracking GitHub Actions run for build #${buildId}...`);
      startBuildPolling();
    } catch (err) {
      showBuildAlert("error", `Dispatch failed (${err.message}). Verify your GitHub Repository name and Personal Access Token (needs repo/workflow scope).`);
    } finally {
      btn.disabled = false;
      btn.classList.remove("opacity-60");
    }
  }

  function startBuildPolling() {
    if (state.buildTracker.pollTimer) {
      clearInterval(state.buildTracker.pollTimer);
    }
    $("trackerPulse").className = "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping";
    pollWorkflowStatus();
    state.buildTracker.pollTimer = setInterval(pollWorkflowStatus, 8000);
  }

  function stopBuildPolling(conclusion) {
    if (state.buildTracker.pollTimer) {
      clearInterval(state.buildTracker.pollTimer);
      state.buildTracker.pollTimer = null;
    }
    state.buildTracker.active = false;
    $("trackerPulse").className =
      conclusion === "success"
        ? "w-2.5 h-2.5 rounded-full bg-emerald-400"
        : "w-2.5 h-2.5 rounded-full bg-rose-500";
  }

  async function pollWorkflowStatus() {
    const repo = (state.settings.githubRepo || DEFAULT_GITHUB_REPO).trim();
    const token = (state.settings.githubToken || "").trim();

    try {
      const resp = await fetch(`https://api.github.com/repos/${repo}/actions/runs?per_page=10`, {
        headers: githubHeaders(token),
        cache: "no-store"
      });
      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }
      const data = await resp.json();
      const runs = data.workflow_runs || [];

      let targetRun = null;
      if (state.buildTracker.matchedRunId) {
        targetRun = runs.find((r) => r.id === state.buildTracker.matchedRunId);
      }
      if (!targetRun && state.buildTracker.dispatchedAt) {
        targetRun = runs.find(
          (r) =>
            r.event === "repository_dispatch" &&
            new Date(r.created_at).getTime() >= state.buildTracker.dispatchedAt
        );
      }
      if (!targetRun) {
        targetRun = runs[0] || null;
      }

      if (!targetRun) {
        $("buildRunStatus").innerHTML = "Waiting for GitHub Actions to queue the workflow run...";
        return;
      }

      state.buildTracker.matchedRunId = targetRun.id;
      renderRunStatusCard(targetRun);

      if (targetRun.status === "completed") {
        stopBuildPolling(targetRun.conclusion);
        await fetchLatestRelease(state.buildTracker.buildId);
      }
    } catch (err) {
      $("buildRunStatus").innerHTML = `<span class="text-rose-400">Could not fetch workflow runs (${escapeHtml(err.message)}). Check repository path or token permissions.</span>`;
    }
  }

  function renderRunStatusCard(run) {
    const status = run.status || "unknown";
    const conclusion = run.conclusion || "";
    const created = new Date(run.created_at);
    const elapsedSec = Math.max(0, Math.floor((Date.now() - created.getTime()) / 1000));
    const mins = Math.floor(elapsedSec / 60);
    const secs = elapsedSec % 60;

    let badgeHtml = '<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300">IN PROGRESS</span>';
    if (status === "queued") {
      badgeHtml = '<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-700 text-slate-200">QUEUED</span>';
    } else if (status === "completed") {
      badgeHtml =
        conclusion === "success"
          ? '<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300">COMPLETED (SUCCESS)</span>'
          : `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300">FAILED (${escapeHtml(conclusion)})</span>`;
    }

    $("buildRunStatus").innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div class="font-semibold text-white">${escapeHtml(run.name || "Build Design4U Android App")} #${run.run_number || ""}</div>
        ${badgeHtml}
      </div>
      <div class="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <span>Triggered via <code class="text-slate-300">${escapeHtml(run.event)}</code> • Elapsed: ${mins}m ${secs}s</span>
        <a href="${escapeHtml(run.html_url)}" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:underline font-semibold">
          View GitHub Logs ↗
        </a>
      </div>
    `;
  }

  async function fetchLatestRelease(preferredBuildId = null) {
    const repo = (state.settings.githubRepo || DEFAULT_GITHUB_REPO).trim();
    const token = (state.settings.githubToken || "").trim();
    const grid = $("releaseAssetsGrid");

    try {
      let release = null;
      if (preferredBuildId) {
        const listResp = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=5`, {
          headers: githubHeaders(token),
          cache: "no-store"
        });
        if (listResp.ok) {
          const list = await listResp.json();
          release = list.find(
            (rel) =>
              (rel.tag_name && rel.tag_name.includes(preferredBuildId)) ||
              (rel.body && rel.body.includes(preferredBuildId))
          );
        }
      }

      if (!release) {
        const latestResp = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
          headers: githubHeaders(token),
          cache: "no-store"
        });
        if (latestResp.status === 404) {
          $("releaseTagBadge").textContent = "No Releases Yet";
          grid.innerHTML = '<div class="sm:col-span-2 text-slate-400 py-2">No GitHub Releases published yet for this repository.</div>';
          return;
        }
        if (!latestResp.ok) {
          throw new Error(`HTTP ${latestResp.status}`);
        }
        release = await latestResp.json();
      }

      $("releaseTagBadge").textContent = release.tag_name || "Latest Release";
      const assets = release.assets || [];
      const wanted = [
        { name: "app-release.apk", label: "Android APK (Direct Install)", accent: "emerald" },
        { name: "app-release.aab", label: "Play Store Bundle (.AAB)", accent: "emerald" },
        { name: "release-keystore.jks", label: "Signing Keystore (.JKS)", accent: "amber" },
        { name: "keystore-info.txt", label: "Keystore Credentials (.TXT)", accent: "slate" }
      ];

      grid.innerHTML = wanted
        .map((item) => {
          const asset = assets.find((a) => a.name === item.name);
          if (!asset) {
            return `
              <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-500">
                <div class="font-semibold text-slate-400">${item.name}</div>
                <div class="text-[11px]">Not attached to release</div>
              </div>`;
          }
          const sizeMb = (asset.size / (1024 * 1024)).toFixed(2);
          const sizeLabel = asset.size > 1024 * 100 ? `${sizeMb} MB` : `${(asset.size / 1024).toFixed(1)} KB`;
          return `
            <a href="${escapeHtml(asset.browser_download_url)}" target="_blank" rel="noopener noreferrer"
              class="p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500/60 transition flex items-center justify-between gap-2 group">
              <div class="min-w-0">
                <div class="font-bold text-white group-hover:text-emerald-300 truncate">${escapeHtml(item.name)}</div>
                <div class="text-[11px] text-slate-400">${escapeHtml(item.label)} • ${sizeLabel}</div>
              </div>
              <span class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-400 shrink-0">Download</span>
            </a>`;
        })
        .join("");
    } catch (err) {
      grid.innerHTML = `<div class="sm:col-span-2 text-rose-400 py-2">Failed to load release assets (${escapeHtml(err.message)}).</div>`;
    }
  }

  function bindStep4Events() {
    $("generateBuildBtn").addEventListener("click", triggerCloudBuild);
    $("refreshTrackerBtn").addEventListener("click", async () => {
      await pollWorkflowStatus();
      await fetchLatestRelease(state.buildTracker.buildId);
    });
  }

  // ---------------- Boot ----------------
  function init() {
    updateTokenBadge();
    bindSettingsEvents();
    bindWizardEvents();
    bindStep1Events();
    bindStep2Events();
    bindStep3Events();
    bindStep4Events();
    bindPreviewEvents();

    selectOfflinePage("index");
    renderNavTabsEditor();
    renderBuildSummary();
    setStep(1);
    setPreviewMode("splash");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
