/**
 * 🛠️ Image URL Normalizer (Admin version)
 * Fixes Mixed Content by upgrading http -> https
 * Handles legacy backend domains (j1ke -> jrle if needed)
 */
export const normalizeImageUrl = (url) => {
  if (!url) return "";
  
  let cleanUrl = url;

  // 1. Upgrade HTTP to HTTPS
  if (cleanUrl.startsWith("http://")) {
    cleanUrl = cleanUrl.replace("http://", "https://");
  }

  // 2. Fix legacy domain if detected
  if (cleanUrl.includes("portfolio-backend-j1ke")) {
    cleanUrl = cleanUrl.replace("portfolio-backend-j1ke", "portfolio-backend-jrle");
  }

  return cleanUrl;
};
