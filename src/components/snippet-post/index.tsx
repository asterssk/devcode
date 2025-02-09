import { TSnippetPost } from "@/lib/types/snippet";
import { Card } from "../ui/card";
import { PostSnippetCardContent } from "./card/content";
import { PostSnippetCardHeader } from "./card/header";
import { SnippetPostProvider } from "./provider";
import { PostSnippetCardFooter } from "./card/footer";

type Props = { snippet: TSnippetPost };

export default function SnippetPost({ snippet }: Props) {
  return (
    <SnippetPostProvider post={snippet}>
      <Card className="rounded-none sm:rounded-md border-r-0 border-l-0 sm:border-l sm:border-r">
        <PostSnippetCardHeader />

        <PostSnippetCardContent />

        <PostSnippetCardFooter />
      </Card>
    </SnippetPostProvider>
  );
}
