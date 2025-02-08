"use client";

import { CardFooter } from "@/components/ui/card";
import { useSnippetPost } from "../provider";
import Link from "next/link";
import { MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SnippetShareMenu } from "@/components/global/menus/snippet-share";
import { SnippetCredButton } from "@/components/global/snippet-cred-button";
import { downvoteSnippetPostAction, upvoteSnippetPostAction } from "../_action";
import { normalizeCount } from "@/lib/utils";

export function PostSnippetCardFooter() {
  const { snippet, urls, upvote, downvote } = useSnippetPost();

  const upvoteWithId = upvoteSnippetPostAction.bind(null, snippet.id);
  const downvoteWithId = downvoteSnippetPostAction.bind(null, snippet.id);

  return (
    <CardFooter className="flex items-center justify-between gap-3">
      <SnippetCredButton
        state={snippet.vote_action}
        votes={snippet.voted_count}
        upvoteAction={async () => {
          upvote();
          await upvoteWithId();
        }}
        downvoteAction={async () => {
          downvote();
          await downvoteWithId();
        }}
      />

      <Button size="xs" variant="secondary" asChild>
        <Link
          href={`${urls.post}?t=comment`}
          className="flex items-center gap-2 border"
        >
          <MessageCircleIcon />
          <span>Comments</span>
          <Separator orientation="vertical" />
          <span className="text-xs">
            {normalizeCount(snippet.comments_count)}
          </span>
        </Link>
      </Button>

      <SnippetShareMenu url="a6d80e2f-6158-4919-912c-1dacf2e1f846" />
    </CardFooter>
  );
}
