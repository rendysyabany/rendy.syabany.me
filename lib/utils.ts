import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateText(
  text: string,
  length: number,
  suffix = "..."
): string {
  if (text.length <= length) return text;

  // Find the last space within the length boundary
  const truncated = text.substr(0, length);
  const lastSpace = truncated.lastIndexOf(" ");

  // If no space found, truncate at exact length
  const end = lastSpace > 0 ? lastSpace : length;

  return text.substr(0, end) + suffix;
}
