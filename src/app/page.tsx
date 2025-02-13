import SnippetPost from "@/components/snippet-post";
import { getDummySnippetPosts } from "@/components/snippet-post/_action";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@/lib/auth";
import { TVisibility } from "@/lib/types";
import { cn } from "@/lib/utils";
import { collection } from "db/schema/collection";
import { eq } from "drizzle-orm";
import { PlusIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

type Props = { searchParams: Promise<{ lang?: string; framework?: string }> };

async function getCollections(id?: string) {
  if (!id) return [];

  return await db.query.collection.findMany({
    with: { user: true },
    where: eq(collection.createdBy, id),
  });
}

export default async function Page({}: Props) {
  const session = await auth.api.getSession({ headers: await headers() });
  const result = await getCollections(session?.user.id);
  const posts = await getDummySnippetPosts(10);

  const groupedCollections = Object.groupBy(
    result,
    ({ visibility }) => visibility
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_19rem] items-start">
      <div
        className={cn(
          "container mx-auto px-0 md:px-8 py-6 max-w-(--breakpoint-lg)",
          "flex flex-col gap-4"
        )}
      >
        {posts.map((post) => (
          <SnippetPost key={post.id} snippet={post} />
        ))}
      </div>

      <div className={cn("sticky top-14 hidden lg:flex flex-col h-rest")}>
        <div className="flex items-center justify-between pl-2 pr-3 pb-2 pt-3">
          <Link
            href="/collections"
            className="text-sm font-semibold hover:underline underline-offset-2"
          >
            MY COLLECTIONS
          </Link>

          <Link href="/form/collection" passHref>
            <Button size="icon-xs" variant="ghost">
              <PlusIcon />
            </Button>
          </Link>
        </div>

        <ScrollArea className="pr-4">
          <div className="flex flex-col pb-3 gap-4">
            {Object.keys(groupedCollections).map((visibility) => {
              const items = groupedCollections[visibility as TVisibility] ?? [];

              return (
                <div key={visibility} className="flex flex-col">
                  <h2 className="py-1 text-xs px-2 uppercase font-bold text-muted-foreground">
                    {visibility}
                  </h2>

                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/collections/${item.user.username}/${item.slug}`}
                      className={cn(
                        "flex items-center gap-2 justify-between p-2 rounded",
                        "transition-colors hover:bg-secondary"
                      )}
                    >
                      <div className="flex flex-nowrap gap-1.5 items-center">
                        <div
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor: item.color ? item.color : "gray",
                          }}
                        />

                        <span className="text-sm line-clamp-1">
                          {item.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs">count</span>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
