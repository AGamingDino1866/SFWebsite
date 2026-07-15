(async () => {
  const allowedCountry = "PK";
  const denyPath = "/deny.html";
  const currentPath = window.location.pathname;

  if (currentPath.endsWith("/deny.html")) return;

  document.documentElement.classList.add("geoblock-checking");

  const redirectToDeny = () => {
    const target = new URL(denyPath, window.location.origin);
    if (window.location.pathname !== target.pathname) window.location.replace(target.href);
  };

  try {
    const response = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!response.ok) {
      redirectToDeny();
      return;
    }

    const data = await response.json();
    const country = String(data.country_code || data.country || "").toUpperCase();
    if (country === allowedCountry) {
      document.documentElement.classList.remove("geoblock-checking");
      return;
    }

    redirectToDeny();
  } catch (error) {
    redirectToDeny();
  }
})();
