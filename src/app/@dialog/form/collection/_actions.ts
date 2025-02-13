"use server";

import { z } from "zod";
import { generateSlug, parseSchema } from "@/lib/utils";
import { collectionSchema } from "@/lib/schema/collections";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { collection } from "db/schema/collection";

export async function saveCollectionSnippet(
  data: z.infer<typeof collectionSchema>
) {
  const errors = parseSchema(collectionSchema, data);
  if (errors.length > 0) return errors;

  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  let userId = session?.user.id ?? "";

  if (!userId) {
    const anon = await auth.api.signInAnonymous();
    if (!anon) return ["Failed to create an anonymous account"];
    userId = anon.user.id;
  }

  await db
    .insert(collection)
    .values({
      id: data.id ?? undefined,
      name: data.name,
      color: data.color,
      visibility: data.visibility,
      slug: generateSlug(data.name),
      createdBy: userId,
    })
    .onConflictDoUpdate({
      target: collection.id,
      set: {
        name: data.name,
        color: data.color,
        visibility: data.visibility,
        slug: generateSlug(data.name),
      },
    });

  revalidatePath("/", "layout");
}
