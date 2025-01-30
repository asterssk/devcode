"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription } from "../ui/card";
import { CollectionMenuButton } from "../menus/collection";

type Props = { title: string };

export function CollectionCard({ title }: Props) {
  return (
    <Card
      className={cn(
        "flex flex-col px-2 pb-2 pt-1",
        "hover:bg-secondary hover:scale-[1.01] transition-all",
        "border-l-[3px] border-l-red-500"
      )}
    >
      <CardContent className="flex justify-between items-center">
        <span className="line-clamp-1 font-semibold text-sm text-nowrap">
          {title}
        </span>

        <CollectionMenuButton />
      </CardContent>

      <CardDescription>
        <p className={cn("line-clamp-1 text-xs text-muted-foreground")}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum modi
          iusto ea sunt assumenda mollitia ex excepturi unde numquam, est, ipsam
          maiores officiis sequi consequuntur. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Unde optio illo officia vel qui vero
          aliquid commodi, quaerat labore. Sunt, id repellendus, rem
          necessitatibus quibusdam quod dolor molestiae similique quis officia
          delectus error explicabo commodi fuga. At esse numquam alias cumque
          voluptatem, architecto quaerat soluta reprehenderit aperiam porro
          aliquid omnis ullam, repellendus commodi necessitatibus animi!
        </p>
      </CardDescription>
    </Card>
  );
}
