import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function limitCharacters(str: string | undefined, limit: number) {
  if (str && str.length <= limit) {
    return str;
  }
  return str ? str.substring(0, limit) + "..." : "";
}

export const formatArrayToString = (value: any): string => {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  return String(value);
};
