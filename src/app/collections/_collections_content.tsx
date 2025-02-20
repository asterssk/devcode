"use client";

import { Empty } from "@/components/ui/empty";
import { myCollectionsViewAtom } from "@/lib/atoms/collections";
import { useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollectionContentTableView } from "./_components/view_table";
import { CollectionCard } from "./_components/card_collection";
import { SnippetCard } from "./_components/card_snippet";
import { collection } from "db/schema/collection";
import { user } from "db/schema/user";

type Props = {
  collections: (typeof collection.$inferSelect & {
    user: typeof user.$inferSelect;
  })[];
  items: {
    id: string;
    name: string;
    email: string;
    location: string;
    status: string;
    balance: string;
  }[];
};

type ContentProps = Props & {
  onCollectionClick?: (id: string) => void;
  onSnippetClick?: (id: string) => void;
};

export function MyCollectionsContent({ collections, items }: Props) {
  const _view = useAtomValue(myCollectionsViewAtom);
  const router = useRouter();
  const { id: ids } = useParams<{ id?: string[] }>();

  if (items.length < 1 && collections.length < 1) {
    return (
      <div className="flex flex-col gap-4 py-8 items-center justify-center h-full">
        <Empty label="This collection is currently empty" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto flex flex-col gap-2 px-4 py-4">
        {_view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {collections.map((item) => {
              const segments = ids ? "/" + ids.join("/") : "";
              const path = `/collections${segments}/${item.id}`;

              return (
                <CollectionCard
                  key={item.id}
                  collection={item}
                  onRoute={() => {
                    router.push(
                      `/collections/${item.user.username}/${item.slug}`
                    );
                  }}
                />
              );
            })}
          </div>
        ) : null}

        {_view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4  py-4">
            {collections.map((item, index) => {
              const segments = ids ? "/" + ids.join("/") : "";
              const path = `/collections${segments}/${item.id}`;

              return (
                <SnippetCard
                  key={item.id}
                  snippet={{ ...item, id: `${item.id}-${index}` }}
                />
              );
            })}
          </div>
        ) : null}

        {_view === "table" ? (
          <CollectionContentTableView
            items={[]}
            // collections={collections}
            // onSnippetClick={(id) => router.push(`/${id}`)}
            // onCollectionClick={(id) => {
            //   const segments = ids ? "/" + ids.join("/") : "";
            //   router.push(`/collections${segments}/${id}`);
            // }}
          />
        ) : null}
      </div>
    </ScrollArea>
  );
}
