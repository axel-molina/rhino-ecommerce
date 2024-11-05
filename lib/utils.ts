import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function limitCharacters(str: string, limit: number) {
  if (str.length <= limit) {
    return str;
  }
  return str.substring(0, limit) + "...";
}