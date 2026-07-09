const LOCAL_API_URL = "http://localhost:5000/api";
const PRODUCTION_API_URL =
  "https://digital-logics-studio-backend.vercel.app/api";
// The -three deployment is not ours and is stale (missing the newer auth routes).
// Old builds/envs had it baked in, so rewrite it to the real backend.
const LEGACY_PRODUCTION_API_URL =
  "https://digital-logics-studio-backend-three.vercel.app/api";

function normalizeUrl(url) {
  return url.trim().replace(/\/+$/, "");
}

export function resolveApiBaseUrl() {
  const configured = process.env.REACT_APP_API_URL?.trim();
  if (configured) {
    const normalized = normalizeUrl(configured);
    if (normalized === normalizeUrl(LEGACY_PRODUCTION_API_URL)) {
      return normalizeUrl(PRODUCTION_API_URL);
    }
    return normalized;
  }
  return process.env.NODE_ENV === "production" ? normalizeUrl(PRODUCTION_API_URL) : LOCAL_API_URL;
}

export function resolveAiBaseUrl() {
  const configuredAi = process.env.REACT_APP_AI_URL?.trim();
  if (configuredAi) {
    return configuredAi.replace(/\/+$/, "");
  }
  return `${resolveApiBaseUrl()}/ai`;
}
