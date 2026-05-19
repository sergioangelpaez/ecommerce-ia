import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getRandom = <T>(arr: T[], count: number): T[] => {
	return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
};
