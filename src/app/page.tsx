import { PostSnippet } from "@/components/post-snippet";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div
      className={cn(
        "container mx-auto px-0 md:px-8 py-4 max-w-screen-lg",
        "flex flex-col gap-4"
      )}
    >
      <PostSnippet />
      <PostSnippet />
      <PostSnippet />
      <PostSnippet />
    </div>
  );
}
