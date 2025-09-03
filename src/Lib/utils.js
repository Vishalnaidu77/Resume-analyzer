import clsx from 'clsx';
import { nanoid } from 'nanoid'
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => {
  return twMerge(clsx(inputs))
}

export function formatSize(bytes) {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = bytes / Math.pow(k, i);
  return `${size.toFixed(2)} ${units[i]}`;
}

export const generateUUID = () => nanoid()