"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type Props = {
  onUpvote: () => void;
  onDownvote: () => void;
  points: number;
  status?: "up" | "down";
};

// Credibility
export function CredButton({ points, status, onUpvote, onDownvote }: Props) {
  return (
    <div
      className={cn(
        "inline-flex -space-x-px rounded-md shadow-xs shadow-black/5 rtl:space-x-reverse",
        "border overflow-clip h-[1.9rem]",
        status === "up"
          ? "border-teal-600 dark:border-teal-800"
          : status === "down"
          ? "border-red-600 dark:border-red-800"
          : ""
      )}
    >
      <Button
        className={cn(
          "border-0 rounded-none",
          status === "up"
            ? "bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-800"
            : ""
        )}
        variant="secondary"
        size="icon-xs"
        aria-label="Upvote"
        onClick={onUpvote}
      >
        <ChevronUp />
      </Button>
      <span
        className={cn(
          "flex border-r border-l border-input items-center px-3 text-xs z-5",
          status === "up"
            ? "border-teal-600 dark:border-teal-800"
            : status === "down"
            ? "border-red-600 dark:border-red-800"
            : ""
        )}
      >
        {points}
      </span>
      <Button
        className={cn(
          "border-0 rounded-none",
          status === "down"
            ? "bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
            : ""
        )}
        variant="secondary"
        size="icon-xs"
        aria-label="Downvote"
        onClick={onDownvote}
      >
        <ChevronDown />
      </Button>
    </div>
  );
}
