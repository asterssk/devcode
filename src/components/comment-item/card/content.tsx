"use client";

import { CardContent } from "@/components/ui/card";
import { useComment } from "../provider";
import { cn } from "@/lib/utils";
import { kCommentIndent } from "@/constants";
import { CommentField } from "@/components/ui/comment-field";

export function CommentCardContent() {
  const { comment, isReplying, isEditing, setIsEditing } = useComment();

  const cancelEdit = () => setIsEditing(false);

  return (
    <CardContent
      className={cn(
        "bg-sidebar border rounded-md transition-colors",
        isEditing ? "" : "px-3 py-2",
        isReplying ? "border-destructive" : ""
      )}
      style={{ margin: `0 ${kCommentIndent}rem` }}
    >
      {isEditing ? (
        <CommentField
          className="border-transparent"
          value={comment.content}
          placeholder="Edit comment..."
          labels={{ submit: "Update Comment" }}
          oncancel={cancelEdit}
          onSubmit={() => {
            cancelEdit();
          }}
        />
      ) : (
        <p className="text-[0.83rem]">{comment.content}</p>
      )}
    </CardContent>
  );
}
