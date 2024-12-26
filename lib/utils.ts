import { JsonValue } from "@prisma/client/runtime/library";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface ObjectWithJsonData {
  data: JsonValue;
  [key: string]: unknown;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseJsonData = (object: ObjectWithJsonData) => {
  return { ...object, data: { ...JSON.parse(object.data as string) } };
};
