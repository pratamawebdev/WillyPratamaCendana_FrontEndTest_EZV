import { configureStore } from "@reduxjs/toolkit";
import { todosApi } from "@/hooks/todo.hook";

/**
 * Create the Redux store.
 * Includes the RTK Query reducer and middleware from `todosApi`.
 */
export const store = configureStore({
  reducer: {
    // Add RTK Query API slice reducer under its own key
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Include default middleware + RTK Query middleware
    getDefaultMiddleware().concat(todosApi.middleware),
});

/**
 * Type representing the entire Redux store.
 */
export type AppStore = typeof store;

/**
 * Type for the root state (used in useSelector).
 */
export type RootState = ReturnType<AppStore["getState"]>;

/**
 * Type for the Redux dispatch function.
 */
export type AppDispatch = AppStore["dispatch"];
