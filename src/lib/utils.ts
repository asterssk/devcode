import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
  const data: Record<string, any> = {};
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
