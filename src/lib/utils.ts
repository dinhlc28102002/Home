import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function queryParams(params: Record<string, string> | any) {
  return Object.values(params || {}).some((param) => !!param)
    ? '?' +
        (await new URLSearchParams({
          ...Object.entries(params || {}).reduce((arr: any, [key, value]) => {
            if (!!(value + '')?.length)
              arr[`${capitalFirstLetter(key)}`] = value;
            return arr;
          }, {}),
        }))
    : '';
}

export function capitalFirstLetter(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
