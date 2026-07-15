const COUNTRY_ALLOWLIST = new Set(["PK"]);
const PUBLIC_PATHS = new Set(["/deny.html", "/favicon.svg"]);

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (
    PUBLIC_PATHS.has(pathname) ||
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/api/")
  ) {
    return next();
  }

  const country =
    request.cf?.country ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country");

  if (country && !COUNTRY_ALLOWLIST.has(country.toUpperCase())) {
    return Response.redirect(new URL("/deny.html", url), 302);
  }

  return next();
}
