/**
 * 🩺 URL Normalizer for Admin API
 * Ensures VITE_API_URL always ends with /api and handles trailing slashes.
 */
export const getApiUrl = (endpoint = '') => {
  // 🚀 HARDCODED PRODUCTION FALLBACK: ensures it works even if Netlify env vars are missing
  const PRODUCTION_BACKEND = "https://portfolio-backend-jrle.onrender.com/api";
  
  let baseUrl = import.meta.env.VITE_API_URL || PRODUCTION_BACKEND;
  
  // Remove trailing slashes if any
  baseUrl = baseUrl.replace(/\/+$/, "");
  
  // Ensure it ends with /api if not already there
  if (baseUrl && !baseUrl.endsWith("/api")) {
    baseUrl += "/api";
  }
  
  // Combine with endpoint (ensuring single slash)
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};
