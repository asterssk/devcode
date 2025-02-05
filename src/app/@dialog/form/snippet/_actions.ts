"use server";

import { snippetSchema } from "@/lib/schema/snippets";
import { redirect, RedirectType } from "next/navigation";
import {
  ServerValidateError,
  createServerValidate,
  formOptions,
} from "@tanstack/react-form/nextjs";
import { z } from "zod";
import { parseFormData } from "@/lib/utils";

export async function saveCodeSnippet(
  data: Partial<z.infer<typeof snippetSchema>>
) {
  //   try {
  //     await validate(formData);
  //   } catch (error) {
  //     console.log("ERROR", error);
  //     if (error instanceof ServerValidateError) return error.formState;
  //     throw error;
  //   }
  //   redirect("/", RedirectType.replace);
  const result = snippetSchema.safeParse(data);
  const fieldErrors = result.error?.flatten().fieldErrors ?? {};

  if (Object.keys(fieldErrors).length > 0) {
    return Object.values(fieldErrors).flat();
  }
}
