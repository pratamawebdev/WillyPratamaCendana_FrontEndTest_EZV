import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, RootState, AppStore } from "@/stores/store";

/**
 * Typed versions of Redux hooks for use throughout the app.
 * These provide full TypeScript support for dispatch, selector, and store access.
 */

// Typed version of useDispatch — dispatch actions with correct types
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Typed version of useSelector — select from state with proper types
export const useAppSelector = useSelector.withTypes<RootState>();

// Typed version of useStore — access store instance if needed
export const useAppStore = useStore.withTypes<AppStore>();
