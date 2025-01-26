"use client";

import { cn } from "@/lib/utils";
import {
  BookOpenTextIcon,
  CodeXmlIcon,
  MessageCircleCodeIcon,
} from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type Props = { id: string; comments: number };

export function SnippetNav({ id, comments }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="bg-background sticky top-14 z-10 flex items-center border-b">
      <Link
        href={`/${id}`}
        className={cn(
          "border-b-2 px-4 py-2.5 text-sm flex items-center gap-2 transition-colors",
          !segment ? "border-b-primary" : "border-b-transparent"
        )}
      >
        <CodeXmlIcon className="size-4" />
        Code
      </Link>
      <Link
        href={`/${id}/readme`}
        className={cn(
          "border-b-2 px-4 py-2.5 text-sm flex items-center gap-2 transition-colors",
          segment === "readme" ? "border-b-primary" : "border-b-transparent"
        )}
      >
        <BookOpenTextIcon className="size-4" />
        Readme
      </Link>
      <Link
        href={`/${id}/comments`}
        className={cn(
          "border-b-2 px-4 py-2.5 text-sm flex items-center gap-2 transition-colors",
          segment === "comments" ? "border-b-primary" : "border-b-transparent"
        )}
      >
        <MessageCircleCodeIcon className="size-4" />
        Comments & Reviews ({comments})
      </Link>
    </div>
  );
}
