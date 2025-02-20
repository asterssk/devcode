"use server";

import { z } from "zod";
import { generateSlug, parseSchema } from "@/lib/utils";
import { collectionSchema } from "@/lib/schema/collections";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { collection, collectionClosure } from "db/schema/collection";
import { eq } from "drizzle-orm";

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

  await db.transaction(async (t) => {
    const [created] = await t
      .insert(collection)
      .values({
        id: data.id ?? undefined,
        name: data.name,
        color: data.color,
        parentId: data.parent_id,
        visibility: data.visibility,
        slug: generateSlug(data.name),
        createdBy: userId,
      })
      .returning();

    // Insert self referencing collection
    await t.insert(collectionClosure).values({
      ancestorId: created.id,
      descendantId: created.id,
      depth: 0,
    });

    if (created.parentId) {
      const ancestors = await t
        .select()
        .from(collectionClosure)
        .where(eq(collectionClosure.descendantId, created.parentId));

      const hierarchy = [
        ...ancestors
          .map((relation) => ({
            ancestorId: relation.ancestorId,
            descendantId: created.id,
            depth: relation.depth + 1,
          }))
          .filter((relation) => {
            return !(
              relation.ancestorId === created.parentId &&
              relation.descendantId === created.id
            );
          }),
        { ancestorId: created.parentId, descendantId: created.id, depth: 1 },
      ];

      await t.insert(collectionClosure).values(hierarchy);
    }
  });

  revalidatePath("/", "layout");
}

// .onConflictDoUpdate({
//     target: collection.id,
//     set: {
//       name: data.name,
//       color: data.color,
//       visibility: data.visibility,
//       slug: generateSlug(data.name),
//     },
//   })
