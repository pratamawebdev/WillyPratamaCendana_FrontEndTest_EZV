import { axiosInstance } from "@/configs/fetcher.config";
import { handleApiErrorWithAxios } from "@/configs/handleApiError.config";
import { TTodo } from "@/types/todo.type";

/**
 * Fetch a list of todos from the server with pagination support.
 *
 * @param start - The starting index (offset) for the todos.
 * @param limit - The maximum number of todos to fetch.
 * @returns An array of TTodo objects.
 */

export const getTodos = async (start = 0, limit = 10): Promise<TTodo[]> => {
  try {
    const response = await axiosInstance.get<TTodo[]>("/todos", {
      params: {
        _start: start,
        _limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    handleApiErrorWithAxios(error);
    throw error;
  }
};

/**
 * Create a new todo by sending data to the server.
 *
 * @param newTodo - A todo object without the `id` field.
 * @returns The created TTodo object (with `id` from backend).
 */

export const createTodo = async (
  newTodo: Omit<TTodo, "id">
): Promise<TTodo> => {
  try {
    const response = await axiosInstance.post<TTodo>("/todos", newTodo);
    return response.data;
  } catch (error) {
    handleApiErrorWithAxios(error);
    throw error;
  }
};
