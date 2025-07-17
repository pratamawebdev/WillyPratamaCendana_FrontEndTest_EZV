import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { axiosInstance } from "@/configs/fetcher.config";

/**
 * A custom base query function for RTK Query using Axios.
 *
 * This allows you to use Axios instead of fetch for all API calls
 * made through RTK Query.
 *
 * @returns A function that handles any HTTP method via Axios.
 */
export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      // Send request using Axios instance (with auth, baseURL, etc.)
      const result = await axiosInstance({ url, method, data, params });

      // Return successful data response
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      // Return error object compatible with RTK Query
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
