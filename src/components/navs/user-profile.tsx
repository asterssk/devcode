"use client";

import { cn } from "@/lib/utils";
import { CodeXmlIcon, TextSearchIcon } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type Props = { id: string; className?: string };

export function UserProfileNav({ id, className }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        "bg-background sticky top-14 z-10 flex items-center border-b",
        className
      )}
    >
      <Link
        href={`/u/${id}`}
        className={cn(
          "border-b-2 px-4 py-2.5 text-sm flex items-center gap-2 transition-colors",
          !segment ? "border-b-primary" : "border-b-transparent"
        )}
      >
        <TextSearchIcon className="size-4" />
        Overview
      </Link>

      <Link
        href={`/u/${id}/posts`}
        className={cn(
          "border-b-2 px-4 py-2.5 text-sm flex items-center gap-2 transition-colors",
          segment === "posts" ? "border-b-primary" : "border-b-transparent"
        )}
      >
        <CodeXmlIcon className="size-4" />
        Posts
      </Link>
    </div>
  );
}
