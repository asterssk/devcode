import { sampleItems } from "@/lib/data/sample";
import { MyCollectionsContent } from "../_collections_content";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { and, eq, gte, isNull } from "drizzle-orm";
import { user } from "db/schema/user";
import { collection, collectionClosure } from "db/schema/collection";
import { Empty } from "@/components/ui/empty";

type Props = { params: Promise<{ id: string[] }> };

async function getCollections({ params }: Props) {
  if (!params) return [];

  const [username, slug] = (await params).id;

  if (!username) return [];

  const owner = await db.query.user.findFirst({
    columns: { id: true },
    where: eq(user.username, username),
  });

  if (!slug) {
    if (!owner?.id) return [];
    return await db.query.collection.findMany({
      with: { user: true },
      where: and(
        eq(collection.createdBy, owner.id),
        eq(collection.visibility, "public"),
        isNull(collection.parentId),
        isNull(collection.deletedAt)
      ),
    });
  }

  //   return await db.query.collection.findMany({
  //     with: {  collectionsClosure:  },
  //     where: and(
  //       eq(collection.slug, slug),
  //       eq(collection.visibility, "public"),
  //       isNull(collection.deletedAt)
  //     ),
  //   });

  //   console.log("AW", aw);

  const currentCollection = await db.query.collection.findFirst({
    columns: { id: true },
    where: eq(collection.slug, slug),
  });

  if (!currentCollection?.id) return [];

  //   const aw = await db
  //     .select()
  //     .from(collection)
  //     .innerJoin(
  //       collectionClosure,
  //       eq(collection.id, collectionClosure.descendantId)
  //     )
  //     .where(
  //       and(
  //         eq(collectionClosure.ancestorId, currentCollection.id),
  //         gte(collectionClosure.depth, 1)
  //       )
  //     );

  const aw = await db.query.collection.findMany({
    with: { children: true },
  });

  console.log("AW", aw);

  //   const aw = await db.query.collection.findMany({
  //     with: {user: true},
  //     where:
  //   })

  return [];

  //   const data = await db
  //     .select()
  //     .from(collection)
  //     .innerJoin(
  //       collectionClosure,
  //       eq(collection.id, collectionClosure.descendantId)
  //     )
  //     .where(eq(collectionClosure.ancestorId, currentCollection.id));

  //   return data.flatMap((e) => e.collection);
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  const collections = await getCollections({ params });

  //   const data = await db.query.user.findMany({
  //     columns: { id: true, username: true },
  //     with: {
  //       profile: true,
  //       //   collections: { where: (collection, { eq }) => eq(collection.slug, slug) },
  //     },
  //   });

  //   const data = await db
  //     .select()
  //     .from(user)
  //     .where(eq(user.username, username))
  //     .leftJoin(collection, eq(user.id, collection.createdBy));

  //   const collections = await db.query.collection.findMany({
  //     // where: eq(collection.slug, slug),
  //     where: (collection, { eq, and }) => and(eq(collection.slug, slug), eq(collection.)),
  //     with: { user: true }
  //     // with: {
  //     //   user: {  columns: {  }, where: () =>  },
  //     // },
  //     // where: () =>
  //     //   where: eq(collection.createdBy, session?.user.id),
  //   });

  return <MyCollectionsContent collections={collections} items={[]} />;
}
