import { ChevronDown, ChevronUp } from "lucide-react";
import { cn, normalizeCount } from "@/lib/utils";
import { Button } from "../ui/button";
import { TVoteAction } from "@/lib/types";

type Props = {
  className?: string;
  state: TVoteAction;
  votes: number;
  upvoteAction: () => Promise<void>;
  downvoteAction: () => Promise<void>;
};

// Credibility
export function CommentCredButton({
  className,
  state,
  votes,
  upvoteAction,
  downvoteAction,
}: Props) {
  return (
    <div
      className={cn(
        "inline-flex -space-x-px rounded-md rtl:space-x-reverse",
        "overflow-clip h-[1.9rem]",
        state === "upvoted"
          ? "border-teal-600 dark:border-teal-800"
          : state === "downvoted"
          ? "text-red-600 dark:border-red-800"
          : "",
        className
      )}
    >
      <form action={upvoteAction} className="h-full flex-none">
        <Button
          className={cn(
            "border-0 rounded-none h-full text-foreground",
            state === "upvoted"
              ? "text-teal-500 hover:text-teal-400 dark:text-teal-400 hover:dark:text-teal-300"
              : ""
          )}
          type="submit"
          variant="ghost"
          size="icon-xs"
          aria-label="Upvote"
        >
          <ChevronUp />
        </Button>
      </form>

      <span
        className={cn(
          "w-full text-nowrap line-clamp-1 text-ellipsis",
          "bg-background flex border-input items-center justify-center px-3 text-xs z-[5]",
          state === "upvoted"
            ? "text-teal-500 dark:text-teal-400 font-bold"
            : state === "downvoted"
            ? "text-red-500 dark:text-red-400 font-bold"
            : ""
        )}
      >
        {normalizeCount(votes)}
      </span>

      <form action={downvoteAction} className="h-full flex-none">
        <Button
          className={cn(
            "border-0 rounded-none h-full text-foreground",
            state === "downvoted"
              ? "text-red-500 hover:text-red-400 dark:text-red-400 hover:text:bg-red-300"
              : ""
          )}
          variant="ghost"
          size="icon-xs"
          aria-label="Downvote"
          type="submit"
        >
          <ChevronDown />
        </Button>
      </form>
    </div>
  );
}
