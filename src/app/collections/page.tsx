import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { collection } from "db/schema/collection";
import { MyCollectionsContent } from "./_collections_content";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  // Fetch collections
  const collections = session
    ? await db.query.collection.findMany({
        with: { user: true },
        where: eq(collection.createdBy, session?.user.id),
      })
    : [];

  // Fetch snippets

  return (
    <MyCollectionsContent
      collections={collections ?? []}
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
