import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally merge Tailwind CSS classes.
 *
 * - `clsx` handles conditional logic and removes falsy values (e.g., undefined, false).
 * - `twMerge` resolves Tailwind class conflicts (e.g., `px-2 px-4` → keeps `px-4`).
 *
 * @param inputs - List of class names or conditional expressions.
 * @returns A single, merged className string.
 *
 * @example
 * cn("px-4", condition && "bg-red-500", "text-sm")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
