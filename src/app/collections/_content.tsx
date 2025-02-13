"use client";

import { CollectionMenuButton } from "@/components/global/menus/collection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { myCollectionsViewAtom } from "@/lib/atoms/collections";
import { TVisibility } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import {
  EllipsisIcon,
  LibraryBigIcon,
  SquareDashedBottomCodeIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { CollectionCard } from "./_collection_card";
type Props = {
  collections: {
    id: string;
    username: string;
    slug: string;
    name: string;
    isOwner: boolean;
    visibility: TVisibility;
    color: string | null;
    updatedAt?: string;
  }[];
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
      <div className="container mx-auto flex flex-col gap-4 px-4">
        {_view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {collections.map((item) => {
              const segments = ids ? "/" + ids.join("/") : "";
              const path = `/collections${segments}/${item.id}`;

              return (
                <Link key={item.id} href={path} passHref>
                  <CollectionCard {...item} />
                </Link>
              );
            })}
          </div>
        ) : null}

        {_view === "grid" ? (
          <GridView items={items} collections={[]} />
        ) : (
          <TableView
            items={items}
            collections={collections}
            onSnippetClick={(id) => router.push(`/${id}`)}
            onCollectionClick={(id) => {
              const segments = ids ? "/" + ids.join("/") : "";
              router.push(`/collections${segments}/${id}`);
            }}
          />
        )}
      </div>
    </ScrollArea>
  );
}

function TableView({
  items,
  collections,
  onSnippetClick,
  onCollectionClick,
}: ContentProps) {
  return (
    <Table
      className={cn(
        "border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr_td]:border-b [&_tr]:border-none"
      )}
    >
      <TableHeader className="z-10 bg-background/90 backdrop-blur-xs text-xs">
        <TableRow className="hover:bg-transparent">
          <TableHead>NAME</TableHead>
          <TableHead>OWNER</TableHead>
          <TableHead>LAST MODIFIED</TableHead>
          <TableHead className="text-center w-24">VISIBILITY</TableHead>
          <TableHead className="text-right w-20" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {collections.map((item) => (
          <TableRow
            key={item.id}
            onClick={() => onCollectionClick?.(item.id)}
            className="cursor-pointer"
          >
            <TableCell>
              <div className="flex items-center gap-2">
                <LibraryBigIcon className="size-3.5" />
                {item.name}
              </div>
            </TableCell>
            <TableCell>{item.isOwner ? "Me" : item.username}</TableCell>
            <TableCell>{item.updatedAt}</TableCell>
            <TableCell className="text-center">
              <Badge
                size="xs"
                className="h-5 bg-teal-200 dark:bg-teal-900"
                variant="secondary"
              >
                {item.visibility.toUpperCase()}
              </Badge>
            </TableCell>

            <TableCell onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-end">
                <CollectionMenuButton id={item.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}

        {items.map((item) => (
          <TableRow
            key={item.id}
            onClick={() => onSnippetClick?.(item.id)}
            className="cursor-pointer"
          >
            <TableCell>
              <div className="flex items-center gap-2">
                <SquareDashedBottomCodeIcon className="size-3.5" />
                {item.name}
              </div>
            </TableCell>
            <TableCell>Me, Us, Everyone</TableCell>
            <TableCell>{new Date().toDateString()}</TableCell>
            <TableCell className="text-center">
              <Badge
                size="xs"
                className="h-5 bg-gray-200 dark:bg-gray-950"
                variant="tag"
              >
                Private
              </Badge>
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-end">
                <Button size="icon-xs" variant="ghost">
                  <EllipsisIcon />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function GridView({ items }: ContentProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => {
        return (
          <Link key={item.id} href={`/${item.id}`} passHref>
            <Card
              className={cn(
                "flex flex-col px-2 pb-2 pt-1",
                "hover:bg-secondary hover:scale-[1.01] transition-all",
                "border-l-[3px] border-l-red-500"
              )}
            >
              <CardContent className="flex justify-between items-center">
                <span className="line-clamp-1 font-semibold text-sm text-nowrap">
                  {item.name}
                </span>

                <CollectionMenuButton id={item.id} />
              </CardContent>

              <CardDescription>
                <p className={cn("line-clamp-1 text-xs text-muted-foreground")}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum modi iusto ea sunt assumenda mollitia ex excepturi
                  unde numquam, est, ipsam maiores officiis sequi consequuntur.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                  optio illo officia vel qui vero aliquid commodi, quaerat
                  labore. Sunt, id repellendus, rem necessitatibus quibusdam
                  quod dolor molestiae similique quis officia delectus error
                  explicabo commodi fuga. At esse numquam alias cumque
                  voluptatem, architecto quaerat soluta reprehenderit aperiam
                  porro aliquid omnis ullam, repellendus commodi necessitatibus
                  animi!
                </p>
              </CardDescription>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
