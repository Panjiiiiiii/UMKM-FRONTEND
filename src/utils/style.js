import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...params) {
  return twMerge(clsx(params));
}