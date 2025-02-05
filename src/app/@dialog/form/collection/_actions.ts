"use server";

import { z } from "zod";
import { parseSchema } from "@/lib/utils";
import { collectionSchema } from "@/lib/schema/collections";

export async function saveCollectionSnippet(
  data: Partial<z.infer<typeof collectionSchema>>
) {
  const errors = parseSchema(collectionSchema, data);
  if (errors.length > 0) return errors;
}
