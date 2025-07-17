import { AxiosError } from "axios";

/**
 * Handles errors from Axios requests.
 * Logs appropriate messages to the console depending on the error type.
 * Always rethrows the error so it can be handled further upstream.
 *
 * @param error - The error thrown by Axios.
 */
export const handleApiErrorWithAxios = (error: unknown): never => {
  if (error instanceof AxiosError) {
    if (error.response) {
      // If the server responded with an error status
      const message =
        (error.response.data as { message?: string })?.message ||
        "An unexpected server error occurred.";
      console.error("🚨 API Error:", message);
    } else {
      // If the request was made but no response received
      console.error("🚨 Network Error:", error.message);
    }
  } else {
    // Unknown error (non-Axios)
    console.error("❌ Unknown Error:", error);
  }

  throw error; // Re-throw to be caught by the caller
};

/**
 * Handles errors from native Fetch API responses.
 * Tries to extract and log a meaningful message from the response body.
 *
 * @param res - The Response object from a failed fetch request.
 */
export const handleApiErrorWithFetch = async (
  res: Response
): Promise<never> => {
  let message = "An unexpected error occurred.";

  try {
    const body = await res.json();
    if (body?.message) {
      message = body.message;
    }
  } catch {
    // Fallback if response body is not JSON
    message = res.statusText || message;
  }

  console.error("🚨 Fetch API Error:", message);
  throw new Error(message);
};
