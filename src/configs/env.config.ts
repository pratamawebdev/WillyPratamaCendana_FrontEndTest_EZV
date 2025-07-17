/**
 * Returns the base URL for the API.
 *
 * - Uses the environment variable `NEXT_PUBLIC_API_URL` if defined.
 * - Falls back to the default URL `https://jsonplaceholder.typicode.com` for development or testing.
 *
 * @returns A string representing the base API URL.
 */
export const getApiBaseUrl = () => {
  return (
    process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com"
  );
};
