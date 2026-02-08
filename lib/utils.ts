import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDomainFromUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace('www.', '');
  } catch {
    return '';
  }
}

export function generateLogoUrl(url: string): string {
  const domain = getDomainFromUrl(url);
  return `https://logo.clearbit.com/${domain}`;
}

export function generateScreenshotUrl(url: string): string {
  return `https://image.thum.io/get/width/1024/crop/768/${url}`;
}
