(() => {
  const injectStyles = () => {
    if (document.querySelector("style[data-success-theme]")) return;
    const style = document.createElement("style");
    style.dataset.successTheme = "true";
    style.textContent = `
      .site-controls{position:fixed;right:18px;bottom:18px;z-index:70;display:flex;gap:8px}.site-controls button{min-height:42px;border:1px solid rgba(28,68,53,.18);border-radius:999px;background:rgba(255,255,255,.92);color:#173d31;padding:10px 16px;font-weight:900;box-shadow:0 16px 36px rgba(19,29,24,.16);cursor:pointer;backdrop-filter:blur(16px)}.site-controls button:hover{transform:translateY(-1px)}body.dark-mode{background:#101512!important;color:#f6f3ea}.dark-mode .site-header,.dark-mode .centered-header{background:rgba(16,21,18,.72)!important}.dark-mode .nav-links,.dark-mode .surface-card,.dark-mode .portal-card,.dark-mode .tool-panel,.dark-mode .scholarship-card,.dark-mode .contact-card,.dark-mode .faq-panel,.dark-mode .modal-card,.dark-mode .timeline-card,.dark-mode .feature-card{background:#17211c!important;color:#f6f3ea!important;border-color:rgba(255,255,255,.14)!important}.dark-mode .site-controls button,.dark-mode .button.secondary{background:#223128!important;color:#f6f3ea!important;border-color:rgba(255,255,255,.18)!important}.dark-mode p,.dark-mode li,.dark-mode small,.dark-mode .muted-text,.dark-mode .checker-result,.dark-mode .status-note,.dark-mode .faq-list p{color:#cad6cf!important}.dark-mode input,.dark-mode select,.dark-mode textarea{background:#101512!important;color:#f6f3ea!important;border-color:rgba(255,255,255,.18)!important}.dark-mode .soft-band{background:#111a15!important}.dark-mode .hero-card{background:linear-gradient(135deg,rgba(23,33,28,.9),rgba(23,33,28,.72))!important;color:#f6f3ea!important}
      @media(max-width:640px){.site-controls{right:12px;bottom:12px}.site-controls button{min-width:96px}}
    `;
    document.head.appendChild(style);
  };

  const setTheme = (theme) => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("successClubTheme", theme);
  };

  const setupControls = () => {
    injectStyles();
    if (document.querySelector(".site-controls")) return;

    const controls = document.createElement("div");
    controls.className = "site-controls";
    controls.innerHTML = `<button type="button" data-theme-toggle aria-label="Toggle dark mode">Dark</button>`;
    document.body.appendChild(controls);

    const themeButton = controls.querySelector("[data-theme-toggle]");
    const savedTheme = localStorage.getItem("successClubTheme") || "light";
    setTheme(savedTheme);
    themeButton.textContent = savedTheme === "dark" ? "Light" : "Dark";

    themeButton.addEventListener("click", () => {
      const next = document.body.classList.contains("dark-mode") ? "light" : "dark";
      setTheme(next);
      themeButton.textContent = next === "dark" ? "Light" : "Dark";
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupControls);
  } else {
    setupControls();
  }
})();
