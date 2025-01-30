"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CollectionMenuButton } from "../menus/collection";

type Props = { title: string };

export function CollectionCard({ title }: Props) {
  return (
    <Card className="rounded-none sm:rounded-md border-r-0 border-l-0 sm:border-l sm:border-r hover:border-primary transition-colors">
      <CardContent className="relative bg-gray-200 dark:bg-gray-950 border-b h-32">
        <CollectionMenuButton className="absolute right-2 top-2" />

        <div className="text-xs absolute bottom-2 right-2 bg-gray-400/15 dark:bg-gray-800/20 py-1 px-2 rounded-sm">
          Saved snippets: 445
        </div>
      </CardContent>

      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-3">
          <div className="my-1 flex flex-col gap-[0.2rem] w-full">
            <span className="line-clamp-1">{title}</span>

            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-thin text-muted-foreground">
                Created at: {new Date().toDateString()}
              </span>
              <span className="text-xs text-right font-thin text-muted-foreground">
                Updated at: {new Date().toDateString()}
              </span>
            </div>
          </div>
        </CardTitle>

        <CardDescription>
          <p className={cn("text-foreground line-clamp-3")}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            modi iusto ea sunt assumenda mollitia ex excepturi unde numquam,
            est, ipsam maiores officiis sequi consequuntur. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Unde optio illo officia vel
            qui vero aliquid commodi, quaerat labore. Sunt, id repellendus, rem
            necessitatibus quibusdam quod dolor molestiae similique quis officia
            delectus error explicabo commodi fuga. At esse numquam alias cumque
            voluptatem, architecto quaerat soluta reprehenderit aperiam porro
            aliquid omnis ullam, repellendus commodi necessitatibus animi!
          </p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
