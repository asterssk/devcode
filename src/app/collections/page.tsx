import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { and, eq, isNull } from "drizzle-orm";
import { MyCollectionsContent } from "./_collections_content";
import { collection, collectionClosure } from "db/schema/collection";

async function getMyCollections(id?: string) {
  if (!id) return [];

  return await db.query.collection.findMany({
    with: { user: true },
    where: and(
      eq(collection.createdBy, id),
      isNull(collection.parentId),
      isNull(collection.deletedAt)
    ),
  });
}

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  const collections = await getMyCollections(session?.user.id);

  // Fetch snippets

  return (
    <MyCollectionsContent
      collections={collections}
      //   collections={collections.map((e) => ({
      //     id: e.id,
      //     name: e.name,
      //     username: e.user.name,
      //     slug: e.slug,
      //     visibility: e.visibility,
      //     isOwner: e.createdBy === session?.user.id,
      //     color: e.color,
      //     updatedAt: e.updatedAt?.toDateString(),
      //   }))}
      items={[]}
    />
  );
}
