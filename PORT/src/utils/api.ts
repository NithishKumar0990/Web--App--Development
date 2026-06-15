/**
 * Resolves the absolute or relative API URL for the frontend.
 * Automatically handles local development, trailing slashes, and
 * self-heals production Vercel URLs that might be missing the required "/api" suffix.
 */
export function getApiUrl(endpoint: string): string {
  let apiBase = (import.meta.env.VITE_API_URL || "").trim();

  if (!apiBase) {
    // Fallback to relative path (handled by Vite proxy in development)
    return endpoint;
  }

  // Remove trailing slashes
  apiBase = apiBase.replace(/\/$/, "");

  // Self-healing check:
  // If it's a remote host (production deployment) and doesn't end with '/api',
  // append '/api' to account for Vercel's PHP routing structure.
  const isLocalhost =
    apiBase.includes("localhost") ||
    apiBase.includes("127.0.0.1") ||
    apiBase.includes("192.168.") ||
    apiBase.includes("0.0.0.0");

  if (!isLocalhost && !apiBase.endsWith("/api")) {
    apiBase += "/api";
  }

  // Format endpoint to ensure a leading slash
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  return `${apiBase}${cleanEndpoint}`;
}
