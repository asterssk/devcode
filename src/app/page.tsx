import { PostSnippet } from "@/components/cards/post-snippet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const collections = [
  { id: "1", title: "Title", count: 223 },
  { id: "2", title: "Title", count: 223 },
  { id: "3", title: "Title", count: 223 },
  { id: "4", title: "Title", count: 223 },
  { id: "5", title: "Title", count: 223 },
  { id: "6", title: "Title", count: 223 },
  { id: "7", title: "Title", count: 223 },
  { id: "8", title: "Title", count: 223 },
  { id: "9", title: "Title", count: 223 },
  { id: "10", title: "Title", count: 223 },
  { id: "11", title: "Title", count: 223 },
  { id: "12", title: "Title", count: 223 },
  { id: "13", title: "Title", count: 223 },
  { id: "14", title: "Title", count: 223 },
  { id: "15", title: "Title", count: 223 },
  { id: "16", title: "Title", count: 223 },
  { id: "17", title: "Title", count: 223 },
  { id: "18", title: "Title", count: 223 },
  { id: "19", title: "Title", count: 223 },
  { id: "20", title: "Title", count: 223 },
  { id: "21", title: "Title", count: 223 },
  { id: "22", title: "Title", count: 223 },
  { id: "23", title: "Title", count: 223 },
  { id: "24", title: "END-0", count: 223 },
  { id: "25", title: "END", count: 223 },
];

type Props = { searchParams: Promise<{ lang?: string; framework?: string }> };

export default async function Page({ searchParams }: Props) {
  const { lang } = await searchParams;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_19rem] items-start">
      <div
        className={cn(
          "container mx-auto px-0 md:px-8 py-6 max-w-screen-lg",
          "flex flex-col gap-4"
        )}
      >
        <PostSnippet />
        <PostSnippet />
        <PostSnippet />
        <PostSnippet />
      </div>

      <div className={cn("sticky top-14 hidden lg:flex flex-col h-rest")}>
        <div className="flex items-center justify-between p-3">
          <Link
            href="/collections"
            className="text-sm font-semibold hover:underline underline-offset-2"
          >
            MY COLLECTIONS {lang}
          </Link>
          <Button size="icon-xs" variant="ghost">
            <PlusIcon />
          </Button>
        </div>

        <ScrollArea className="pr-4">
          <div className="flex flex-col pb-3">
            {collections.map((collect) => (
              <React.Fragment key={collect.id}>
                <Link
                  href={`/collections/${collect.id}`}
                  className={cn(
                    "flex items-center gap-2 justify-between px-3 py-3 rounded",
                    "transition-colors hover:bg-secondary"
                  )}
                >
                  <span className="text-sm line-clamp-1">{collect.title}</span>
                  <span className="text-xs">{collect.count}</span>
                </Link>
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
