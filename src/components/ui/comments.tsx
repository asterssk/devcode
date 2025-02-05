"use client";

import type React from "react";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MessageCircleIcon,
  MessageCircleXIcon,
  StarIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

type Props = { comment: Comment; level?: number };

export function CommentComponent({ comment, level = 0 }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState<string>();
  const [replyContent, setReplyContent] = useState("");

  const indent = 1.7;

  const handleReply = () => {
    // In a real application, you would send this data to your backend
    console.log(`Replying to comment ${comment.id}: ${replyContent}`);
    setReplyContent("");
    setIsReplying(undefined);
  };

  const handleTriggerReply = () => {
    setIsReplying((current) => (current ? undefined : comment.id));
  };

  return (
    <Card
      className={cn(
        `bg-transparent transition-colors`,
        "hover:border-zinc-400 border-zinc-300 ",
        "dark:hover:border-zinc-700 dark:border-zinc-800",
        level > 0
          ? "border-r-0 rounded-tr-none rounded-bl-none border-b-0 pb-0"
          : ""
      )}
      style={{ marginLeft: level > 0 ? `${indent}rem` : "" }}
    >
      <CardHeader>
        <div className="flex flex-row items-start gap-3">
          <Avatar className="size-9">
            <AvatarImage src={comment.avatar} alt={comment.author} />
            <AvatarFallback>{comment.author[0]}</AvatarFallback>
          </Avatar>

          <div className="flex items-start flex-col gap-0">
            <h3 className="text-sm font-semibold">{comment.author}</h3>
            <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent
        className={cn(
          "bg-sidebar border rounded-md px-4 py-2 transition-colors",
          isReplying ? "border-destructive" : ""
        )}
        style={{ marginLeft: `${indent}rem`, marginRight: `${indent}rem` }}
      >
        <p className="text-sm">{comment.content}</p>
      </CardContent>

      <CardFooter
        className="flex justify-between pt-3 px-0"
        style={{ marginLeft: `${indent}rem`, marginRight: `${indent}rem` }}
      >
        <div className="flex gap-4">
          <Button variant="transparent" size="fit">
            <StarIcon />
            Stars (2)
          </Button>

          <Button
            variant="transparent"
            size="fit"
            onClick={() => handleTriggerReply()}
          >
            {isReplying ? <MessageCircleXIcon /> : <MessageCircleIcon />}
            Reply
          </Button>
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <Button
            variant="ghost"
            size="xs"
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
                Show Replies ({comment.replies.length})
              </>
            )}
          </Button>
        )}
      </CardFooter>

      {isReplying && (
        <CardContent
          className="pb-4"
          style={{ marginLeft: `${indent}rem`, marginRight: `${indent}rem` }}
        >
          <div className="flex gap-2">
            <Textarea
              placeholder={`Write your reply to ${comment.author}`}
              autoFocus
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />

            <div className="flex flex-col gap-2 justify-between">
              <Button onClick={handleReply} size="xs">
                Submit Reply
              </Button>

              <Button
                onClick={handleReply}
                size="xs"
                variant="secondary"
                className="border"
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      )}

      {isExpanded && comment.replies && (
        <CardContent>
          {comment.replies.map((reply) => (
            <CommentComponent
              key={reply.id}
              comment={reply}
              level={level + 1}
            />
          ))}
        </CardContent>
      )}
    </Card>
  );
}
