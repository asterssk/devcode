"use client";

import { cn } from "@/lib/utils";
import {
  CodeXmlIcon,
  MessageCircleCodeIcon,
  SettingsIcon,
  TextSearchIcon,
} from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type Props = { id: string; comments: number; className?: string };

export function UserProfileNav({ id, comments, className }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        "bg-background sticky top-14 z-10 flex items-center border-b",
        className
      )}
    >
      <Link
        href={`/${id}`}
        className={cn(
          "border-b-2 px-4 py-2.5 text-sm flex items-center gap-2 transition-colors",
          !segment ? "border-b-primary" : "border-b-transparent"
        )}
      >
        <TextSearchIcon className="size-4" />
        Overview
      </Link>

      <Link
        href={`/${id}/comments`}
        className={cn(
          "border-b-2 px-4 py-2.5 text-sm flex items-center gap-2 transition-colors",
          segment === "comments" ? "border-b-primary" : "border-b-transparent"
        )}
      >
        <CodeXmlIcon className="size-4" />
        Posts
      </Link>

      <Link
        href={`/${id}/comments`}
        className={cn(
          "border-b-2 px-4 py-2.5 text-sm flex items-center gap-2 transition-colors",
          segment === "comments" ? "border-b-primary" : "border-b-transparent"
        )}
      >
        <SettingsIcon className="size-4" />
        Settings
      </Link>
    </div>
  );
}
