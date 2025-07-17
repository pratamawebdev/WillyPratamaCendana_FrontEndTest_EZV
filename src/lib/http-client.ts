/**
 * Retrieves the access token from localStorage (client-side only).
 *
 * @returns The access token string, or `null` if not available or on server-side.
 */
export const getAccessToken = () => {
  // Prevents code from running during SSR (Next.js server-side)
  if (typeof window === "undefined") return null;

  // Read token from localStorage
  return localStorage.getItem("access_token");
};
