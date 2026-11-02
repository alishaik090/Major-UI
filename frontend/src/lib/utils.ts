import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDuration(milliseconds?: number): string {
  return typeof milliseconds === "number" ? `${(milliseconds / 1000).toFixed(2)} seconds` : "Not supplied";
}
