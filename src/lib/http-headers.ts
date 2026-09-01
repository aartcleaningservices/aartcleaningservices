const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https: wss:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

export function applySecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Strict-Transport-Security", "max-age=15768000; includeSubDomains");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Content-Security-Policy-Report-Only", CSP_REPORT_ONLY);
  headers.set("Permissions-Policy", "geolocation=(self), camera=(), microphone=()");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "[::1]"]);

/** 301 every plain-http request to https (skipping local dev). */
export function httpsRedirect(request: Request): Response | undefined {
  const url = new URL(request.url);
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const proto = forwardedProto ?? url.protocol.replace(":", "");
  if (proto !== "http") return undefined;
  if (LOCAL_HOSTS.has(url.hostname) || url.hostname.endsWith(".local")) return undefined;

  url.protocol = "https:";
  url.port = "";
  return new Response(null, {
    status: 301,
    headers: { location: url.toString(), "cache-control": "no-store" },
  });
}

export function wantsMarkdown(request: Request): boolean {
  const accept = request.headers.get("accept") ?? "";
  if (!/text\/markdown/i.test(accept)) return false;
  // Browsers never ask for markdown first; agents send it explicitly.
  return true;
}
