"use client";

import { cn } from "@/lib/utils";
import { CodeXmlIcon, MessageCircleCodeIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = { slug: string[]; comments: number };

export function SnippetNav({ slug, comments }: Props) {
  const searchParams = useSearchParams();

  return (
    <div className="bg-background sticky top-14 z-10 flex items-center border-b">
      <Link
        href={`/s/${slug.join("/")}?t=code`}
        className={cn(
          "border-b-2 px-4 py-2.5 text-sm flex items-center gap-2 transition-colors",
          !searchParams.has("t") || searchParams.get("t") === "code"
            ? "border-b-primary"
            : "border-b-transparent"
        )}
      >
        <CodeXmlIcon className="size-4" />
        Code
      </Link>

      <Link
        href={`/s/${slug.join("/")}?t=comments`}
        className={cn(
          "border-b-2 px-4 py-2.5 text-sm flex items-center gap-2 transition-colors",
          searchParams.get("t") === "comments"
            ? "border-b-primary"
            : "border-b-transparent"
        )}
      >
        <MessageCircleCodeIcon className="size-4" />
        Comments & Reviews ({comments})
      </Link>
    </div>
  );
}
