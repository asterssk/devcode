"use client";

import {
  CopyIcon,
  CornerUpRightIcon,
  MessageCircleIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PostMenuButton } from "./post-menu";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type Props = { layout?: "saved"; savedDate?: string };

export function PostSnippet({ savedDate }: Props) {
  return (
    <Card className="rounded-none sm:rounded-md border-r-0 border-l-0 sm:border-l sm:border-r">
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="my-1 flex flex-col gap-[0.2rem]">
              <h3>Title</h3>
              <span className="text-xs font-thin text-muted-foreground">
                Name of the user : {new Date().toDateString()}
              </span>
            </div>
          </div>

          {savedDate ? (
            <span className="text-xs font-normal text-muted-foreground">
              Saved at: {savedDate}
            </span>
          ) : (
            <PostMenuButton />
          )}
        </CardTitle>

        <CardDescription>
          <p
            className={cn(
              "text-foreground",
              savedDate ? "line-clamp-2" : "line-clamp-3"
            )}
          >
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

      <Link href="/sadasd">
        <CardContent
          className={cn(
            "relative px-0 bg-gray-200 dark:bg-gray-950 border-t border-b",
            savedDate ? "h-52" : "h-64"
          )}
        >
          <p>Card Content</p>

          {savedDate ? null : (
            <div className="px-2 py-2 mt-auto absolute bottom-0 flex flex-wrap gap-2">
              <Badge size="xs" variant="action">
                Javascript
              </Badge>
              <Badge size="xs" variant="action">
                Typescript
              </Badge>
              <Badge size="xs" variant="action">
                React
              </Badge>
            </div>
          )}

          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <CopyIcon />
          </Button>
        </CardContent>
      </Link>

      {savedDate ? null : (
        <CardFooter className="flex items-center justify-between gap-3">
          <Button
            size="xs"
            variant="secondary"
            className="flex items-center gap-2 border"
          >
            <StarIcon />
            <span>Stars</span>
            <Separator orientation="vertical" />
            <span className="text-xs text-muted-foreground">86</span>
          </Button>

          <Button
            size="xs"
            variant="secondary"
            className="flex items-center gap-2 border"
          >
            <MessageCircleIcon />
            <span>Comments</span>
            <Separator orientation="vertical" />
            <span className="text-xs text-muted-foreground">86</span>
          </Button>

          <Button size="xs" variant="ghost" className="ml-auto">
            Share
            <CornerUpRightIcon />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
