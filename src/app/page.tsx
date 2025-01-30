import { PostSnippet } from "@/components/cards/post-snippet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const collections = [
  { id: "1", title: "Title", count: 223, visibility: "public" },
  { id: "2", title: "Title", count: 223, visibility: "public" },
  { id: "3", title: "Title", count: 223, visibility: "private" },
  { id: "4", title: "Title", count: 223, visibility: "private" },
  { id: "5", title: "Title", count: 223, visibility: "private" },
  { id: "6", title: "Title", count: 223, visibility: "private" },
  { id: "7", title: "Title", count: 223, visibility: "private" },
  { id: "8", title: "Title", count: 223, visibility: "private" },
  { id: "9", title: "Title", count: 223, visibility: "private" },
  { id: "10", title: "Title", count: 223, visibility: "private" },
  { id: "11", title: "Title", count: 223, visibility: "private" },
  { id: "12", title: "Title", count: 223, visibility: "private" },
  { id: "13", title: "Title", count: 223, visibility: "private" },
  { id: "14", title: "Title", count: 223, visibility: "private" },
  { id: "15", title: "Title", count: 223, visibility: "private" },
  { id: "16", title: "Title", count: 223, visibility: "private" },
  { id: "17", title: "Title", count: 223, visibility: "private" },
  { id: "18", title: "Title", count: 223, visibility: "private" },
  { id: "19", title: "Title", count: 223, visibility: "private" },
  { id: "20", title: "Title", count: 223, visibility: "public" },
  { id: "21", title: "Title", count: 223, visibility: "private" },
  { id: "22", title: "Title", count: 223, visibility: "private" },
  { id: "23", title: "Title", count: 223, visibility: "private" },
  { id: "24", title: "END-0", count: 223, visibility: "private" },
  { id: "25", title: "END", count: 223, visibility: "private" },
];

type Props = { searchParams: Promise<{ lang?: string; framework?: string }> };

export default async function Page({ searchParams }: Props) {
  const { lang } = await searchParams;

  const groupedCollections = Object.groupBy(
    collections,
    ({ visibility }) => visibility
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_19rem] items-start">
      <div
        className={cn(
          "container mx-auto px-0 md:px-8 py-6 max-w-screen-lg",
          "flex flex-col gap-4"
        )}
      >
        <PostSnippet id="sample_1" snippet={{ status: "down" }} />
        <PostSnippet id="sample_2" snippet={{ status: "down" }} />
        <PostSnippet id="sample_3" snippet={{ status: "up" }} />
        <PostSnippet id="sample_4" snippet={{}} />
      </div>

      <div className={cn("sticky top-14 hidden lg:flex flex-col h-rest")}>
        <div className="flex items-center justify-between pl-2 pr-3 pb-2 pt-3">
          <Link
            href="/collections"
            className="text-sm font-semibold hover:underline underline-offset-2"
          >
            MY COLLECTIONS {lang}
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
              const items = groupedCollections[visibility] ?? [];

              return (
                <div key={visibility} className="flex flex-col">
                  <h2 className="py-1 text-xs px-2 uppercase font-bold text-muted-foreground">
                    {visibility}
                  </h2>

                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/collections/${item.id}`}
                      className={cn(
                        "flex items-center gap-2 justify-between p-2 rounded",
                        "transition-colors hover:bg-secondary"
                      )}
                    >
                      <div className="flex flex-nowrap gap-1.5 items-center">
                        <div className="bg-red-500 h-1.5 w-1.5 rounded-full" />
                        <span className="text-sm line-clamp-1">
                          {item.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs">{item.count}</span>
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
