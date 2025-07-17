import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/axios-base-query";
import type { TTodo } from "@/types/todo.type";

/**
 * RTK Query API slice for todos.
 * Handles fetching and creating todos using a custom Axios base query.
 */
export const todosApi = createApi({
  // The key for this slice in the Redux store
  reducerPath: "todosApi",

  // Custom Axios-based query function
  baseQuery: axiosBaseQuery(),

  // Define tag types for cache invalidation
  tagTypes: ["Todos"],

  endpoints: (builder) => ({
    /**
     * GET /todos
     * Fetches todos with pagination (start & limit).
     */
    getTodos: builder.query<TTodo[], { start: number; limit: number }>({
      query: ({ start, limit }) => ({
        url: "/todos",
        method: "GET",
        params: {
          _start: start, // offset for pagination
          _limit: limit, // page size
        },
      }),

      // Provide tags to enable cache tracking per page
      providesTags: (result, error, args) => [
        { type: "Todos", id: `${args.start}-${args.limit}` },
      ],
    }),

    /**
     * POST /todos
     * Creates a new todo item.
     */
    createTodo: builder.mutation<TTodo, Omit<TTodo, "id">>({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        data: newTodo,
      }),

      // Invalidate all Todos cache on mutation (for refetch)
      invalidatesTags: () => [{ type: "Todos" }],
    }),
  }),
});

// Export auto-generated React hooks for usage in components
export const { useGetTodosQuery, useCreateTodoMutation } = todosApi;
