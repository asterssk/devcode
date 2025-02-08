"use client";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSnippetPost } from "../provider";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2Icon } from "lucide-react";
import { SnippetOptionsMenu } from "@/components/global/menus/snippet";

export function PostSnippetCardHeader() {
  const { snippet, urls } = useSnippetPost();

  return (
    <CardHeader>
      <CardTitle className="flex items-start justify-between gap-3">
        <div className="flex gap-3 flex-1">
          <Link href={urls.user} className="rounded-full">
            <Avatar>
              <AvatarImage src={snippet?.author_avatar} alt="@shadcn" />
              <AvatarFallback>
                <User2Icon className="size-5 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </Link>

          <div className="my-1 flex flex-col gap-[0.2rem]">
            <Link href={urls.post}>
              <h1>{snippet?.title}</h1>
            </Link>
            <Link
              href={urls.user}
              className="text-xs font-thin text-muted-foreground hover:text-foreground transition-colors"
            >
              {snippet?.author_name} : {new Date().toDateString()}
            </Link>
          </div>
        </div>

        <SnippetOptionsMenu />
      </CardTitle>

      <CardDescription>
        <p className="text-foreground line-clamp-3">
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
    </CardHeader>
  );
}
