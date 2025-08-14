import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getReadableTextColor(backgroundHex: string): string {
  const hex = backgroundHex.replace("#", "");
  const expanded =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;
  const isValid = /^([0-9a-fA-F]{6})$/.test(expanded);
  if (!isValid) return "#ffffff";
  const r = parseInt(expanded.substring(0, 2), 16);
  const g = parseInt(expanded.substring(2, 4), 16);
  const b = parseInt(expanded.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 186 ? "#000000" : "#ffffff";
}
