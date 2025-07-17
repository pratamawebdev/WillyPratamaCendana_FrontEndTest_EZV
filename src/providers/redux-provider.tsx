"use client";

import { Provider } from "react-redux";
import { store } from "@/stores/store";

/**
 * ReduxProvider wraps the application with Redux's <Provider>,
 * allowing access to the Redux store from any component.
 *
 * This component should be used in `layout.tsx` or the root of the app.
 */
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
