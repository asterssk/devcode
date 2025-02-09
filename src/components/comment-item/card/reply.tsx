"use client";

import { CardContent } from "@/components/ui/card";
import { useComment } from "../provider";
import { kCommentIndent } from "@/constants";
import { CommentField } from "@/components/ui/comment-field";

export function CommentCardReply() {
  const { comment, isReplying, setIsReplying } = useComment();

  if (!isReplying) return null;

  const cancelReply = () => setIsReplying(false);

  return (
    <CardContent
      className="pb-1.5"
      style={{ margin: `0 ${kCommentIndent}rem` }}
    >
      <CommentField
        placeholder={`Write your reply to ${comment.author_name}`}
        labels={{ submit: "Post Reply" }}
        oncancel={cancelReply}
        onSubmit={() => {
          cancelReply();
        }}
      />
    </CardContent>
  );
}
