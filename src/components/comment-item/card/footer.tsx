"use client";

import { CardFooter } from "@/components/ui/card";
import { useComment } from "../provider";
import { kCommentIndent } from "@/constants";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  MessageCircleIcon,
  MessageCircleXIcon,
} from "lucide-react";
import { CommentCredButton } from "@/components/global/comment-cred-button";
import { cn } from "@/lib/utils";

export function CommentCardFooter() {
  const {
    comment,
    isReplying,
    isExpanded,
    setIsReplying,
    setIsExpanded,
    upvote,
    downvote,
  } = useComment();

  //   const upvoteWithId = upvoteSnippetPostAction.bind(null, snippet.id);
  //   const downvoteWithId = downvoteSnippetPostAction.bind(null, snippet.id);

  return (
    <CardFooter
      className={cn(
        "flex justify-between p-0"
        // isExpanded || isReplying ? "" : "pb-1.5"
      )}
      style={{ margin: `0.3rem ${kCommentIndent}rem` }}
    >
      <div className="flex gap-4">
        <CommentCredButton
          state={comment.vote_action}
          votes={comment.voted_count}
          upvoteAction={async () => {
            // upvote();
            // await upvoteWithId();
          }}
          downvoteAction={async () => {}}
        />

        <Button
          variant="ghost"
          size="fit"
          className="px-2"
          onClick={() => setIsReplying((current) => !current)}
        >
          {isReplying ? <MessageCircleXIcon /> : <MessageCircleIcon />}
          Reply
        </Button>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <Button
          variant="ghost"
          size="xs"
          className="px-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp />
              Hide Replies
            </>
          ) : (
            <>
              <ChevronDown />
              Show Replies ({comment.replies.length ?? 0})
            </>
          )}
        </Button>
      )}
    </CardFooter>
  );
}
