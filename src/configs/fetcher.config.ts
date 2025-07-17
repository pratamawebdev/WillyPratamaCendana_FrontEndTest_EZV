import axios from "axios";
import { getApiBaseUrl } from "./env.config";
import { getAccessToken } from "@/lib/http-client";

/**
 * Axios instance with default configuration.
 * Sets base URL and JSON content type.
 * Automatically attaches Bearer token if available.
 */
export const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization token to each request if available
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * Generic fetcher function for use with SWR or custom fetch calls.
 * Adds Bearer token to headers if available.
 *
 * @param path - The relative API path (e.g., "/todos")
 * @param options - Optional fetch configuration
 * @returns The parsed JSON response
 */
export async function fetcher<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();

  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // attach token if present
      ...(options.headers || {}), // allow overriding headers
    },
  });

  if (!res.ok) {
    let message = "Request failed";
    try {
      const errorBody = await res.json();
      message = errorBody.message || message;
    } catch {
      // fallback to default message or HTTP status text
    }
    throw new Error(message);
  }

  return res.json();
}
