import { ChevronDown, ChevronUp } from "lucide-react";
import { cn, normalizeCount } from "@/lib/utils";
import { Button } from "../ui/button";
import { TVoteAction } from "@/lib/types/";

type Props = {
  className?: string;
  state: TVoteAction;
  votes: number;
  upvoteAction: () => Promise<void>;
  downvoteAction: () => Promise<void>;
};

// Credibility
export function SnippetCredButton({
  className,
  state,
  votes,
  upvoteAction,
  downvoteAction,
}: Props) {
  return (
    <div
      className={cn(
        "inline-flex -space-x-px rounded-md shadow-sm shadow-black/5 rtl:space-x-reverse",
        "border overflow-clip h-[1.9rem]",
        state === "upvoted"
          ? "border-teal-600 dark:border-teal-800"
          : state === "downvoted"
          ? "border-red-600 dark:border-red-800"
          : "",
        className
      )}
    >
      <form action={upvoteAction} className="h-full flex-none">
        <Button
          className={cn(
            "border-0 rounded-none h-full",
            state === "upvoted"
              ? "bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-700 hover:dark:bg-teal-800"
              : ""
          )}
          type="submit"
          variant="secondary"
          size="icon-xs"
          aria-label="Upvote"
        >
          <ChevronUp />
        </Button>
      </form>

      <span
        className={cn(
          "w-full text-nowrap line-clamp-1 text-ellipsis",
          "bg-background flex border-r border-l border-input items-center justify-center px-3 text-xs z-[5]",
          state === "upvoted"
            ? "border-teal-600 dark:border-teal-800"
            : state === "downvoted"
            ? "border-red-600 dark:border-red-800"
            : ""
        )}
      >
        {normalizeCount(votes)}
      </span>

      <form action={downvoteAction} className="h-full flex-none">
        <Button
          className={cn(
            "border-0 rounded-none h-full",
            state === "downvoted"
              ? "bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 hover:dark:bg-red-800"
              : ""
          )}
          variant="secondary"
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
