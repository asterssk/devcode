"use client";

import {
  CopyIcon,
  CornerUpRightIcon,
  MessageCircle,
  MessageCircleIcon,
  StarIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import Link from "next/link";

export function PostSnippet() {
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
              <span>Title</span>
              <span className="text-xs font-thin text-muted-foreground">
                Name of the user : {new Date().toDateString()}
              </span>
            </div>
          </div>

          <div className="font-normal space-x-2">
            <Badge size="xs">Javascript</Badge>
            <Badge size="xs">Typescript</Badge>
            <Badge size="xs">React</Badge>
          </div>
        </CardTitle>

        <CardDescription>
          <p className="line-clamp-3 text-foreground">
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
        <CardContent className="relative px-0 h-64 bg-gray-200 dark:bg-gray-950 border-t border-b">
          <p>Card Content</p>

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
    </Card>
  );
}
