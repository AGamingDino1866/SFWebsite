const ensureResourcesNavLink = () => {
  const navLinks = document.querySelector(".nav-links");
  if (!navLinks || navLinks.querySelector('a[href="resources.html"]')) return;

  const contactLink = navLinks.querySelector('a[href="contact.html"]');
  const resourcesLink = document.createElement("a");
  resourcesLink.href = "resources.html";
  resourcesLink.textContent = "Resources";
  if (window.location.pathname.endsWith("resources.html")) resourcesLink.classList.add("active");

  if (contactLink) {
    navLinks.insertBefore(resourcesLink, contactLink);
  } else {
    navLinks.appendChild(resourcesLink);
  }
};

const setupNavigation = () => {
  ensureResourcesNavLink();

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
};

const loadUiControls = () => {
  if (document.querySelector("script[data-ui-controls]")) return;
  const script = document.createElement("script");
  script.src = "assets/js/ui.js";
  script.defer = true;
  script.dataset.uiControls = "true";
  document.body.appendChild(script);
};

setupNavigation();
loadUiControls();
