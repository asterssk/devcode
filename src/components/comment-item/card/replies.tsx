"use client";

import { useComment } from "../provider";
import CommentItem from "..";

export function CommentCardReplies() {
  const { comment, isExpanded, level } = useComment();

  if (!comment.replies || !isExpanded) return null;

  return (
    <div className="flex flex-col">
      {comment.replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} level={level + 1} />
      ))}
    </div>
  );
}
