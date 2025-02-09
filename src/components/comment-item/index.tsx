import { Card } from "../ui/card";
import { CommentProvider } from "./provider";
import { TComment } from "@/lib/types/comment";
import { cn } from "@/lib/utils";
import { CommentCardHeader } from "./card/header";
import { kCommentIndent } from "@/constants";
import { CommentCardContent } from "./card/content";
import { CommentCardFooter } from "./card/footer";
import { CommentCardReply } from "./card/reply";
import { CommentCardReplies } from "./card/replies";

type Props = { comment: TComment; level?: number };

export default function CommentItem({ comment, level = 0 }: Props) {
  return (
    <CommentProvider comment={comment} level={level}>
      <Card
        className={cn(
          "flex flex-col",
          `bg-transparent transition-colors`,
          "hover:border-zinc-400 border-input",
          "dark:hover:border-zinc-700 dark:border-zinc-800",
          level > 0
            ? "border-r-0 rounded-tr-none rounded-bl-none border-b-0 pb-0"
            : ""
        )}
        style={{ marginLeft: level > 0 ? `${kCommentIndent}rem` : "" }}
      >
        <CommentCardHeader />

        <CommentCardContent />

        <CommentCardFooter />

        <CommentCardReply />

        <CommentCardReplies />
      </Card>
    </CommentProvider>
  );
}
