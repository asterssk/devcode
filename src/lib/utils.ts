import { clsx, type ClassValue } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function waitTimeout(ms?: number) {
  return new Promise((resolve) => setTimeout(resolve, ms ?? 100));
}

export function normalizeCount(count: number) {
  if (Math.abs(count) >= 1_000_000_000) {
    return `${(count / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  }
  if (Math.abs(count) >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (Math.abs(count) >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return count.toString();
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;
  return `${pathname}${queryString}`;
};

/**
 * Generic form parser that validates FormData against a Zod schema.
 * @param schema - Zod schema for validation
 * @param formData - FormData object from the request
 * @returns Parsed data or errors
 */
export function parseFormData<T extends z.ZodTypeAny>(
  schema: T,
  formData: FormData
) {
  // Convert FormData into an object
  const data: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  // Validate using the schema
  const result = schema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: result.error.format() };
  }

  return { success: true, data: result.data };
}

export function parseSchema<T extends z.ZodTypeAny>(
  schema: T,
  data: Partial<z.infer<T>>
) {
  const result = schema.safeParse(data);
  const fieldErrors = result.error?.flatten().fieldErrors ?? {};
  return Object.values(fieldErrors)
    .flat()
    .filter((e) => e !== undefined);
}

export function generateSlug(...origin: string[]) {
  const maxLength = 50;

  const slug = origin
    .map((str) =>
      str
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
    )
    .filter(Boolean)
    .join("-");

  return slug.length > maxLength
    ? slug.slice(0, slug.lastIndexOf("-", maxLength)) ||
        slug.slice(0, maxLength)
    : slug;
}
