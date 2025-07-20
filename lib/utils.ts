import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function pmt(
  rate: number,
  nper: number,
  pv: number,
  fv: number = 0,
  type: 0 | 1 = 0,
): number {
  if (rate === 0) {
    return -(pv + fv) / nper;
  }

  const pmtValue =
    (rate * (pv * Math.pow(1 + rate, nper) + fv)) /
    ((1 + rate * type) * (Math.pow(1 + rate, nper) - 1));
  return ceilToNearestHundred(pmtValue);
}

export function ceilToNearestHundred(num: number): number {
  return Math.ceil(num / 100) * 100;
}

export function formatToPeso(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
