"use client";

import { cn } from "@/lib/utils";
import {
  ActivityIcon,
  CodeXmlIcon,
  SettingsIcon,
  UserRoundCheckIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type Props = { id: string; className?: string };

export function AccountNav({ className }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        "bg-background sticky top-14 z-10 flex items-center border-b",
        className
      )}
    >
      <Link
        href={`/account`}
        className={cn(
          "border-b-2 px-4 py-2.5 text-sm flex items-center gap-2 transition-colors",
          !segment ? "border-b-primary" : "border-b-transparent"
        )}
      >
        <ActivityIcon className="size-4" />
        Activity
      </Link>

      <Link
        href={`/account/following`}
        className={cn(
          "border-b-2 px-4 py-2.5 text-sm flex items-center gap-2 transition-colors",
          segment === "following" ? "border-b-primary" : "border-b-transparent"
        )}
      >
        <UserRoundCheckIcon className="size-4" />
        Following
      </Link>

      <Link
        href={`/account/followers`}
        className={cn(
          "border-b-2 px-4 py-2.5 text-sm flex items-center gap-2 transition-colors",
          segment === "followers" ? "border-b-primary" : "border-b-transparent"
        )}
      >
        <UsersIcon className="size-4" />
        Followers
      </Link>

      <Link
        href={`/account/settings`}
        className={cn(
          "border-b-2 px-4 py-2.5 text-sm flex items-center gap-2 transition-colors",
          segment === "settings" ? "border-b-primary" : "border-b-transparent"
        )}
      >
        <SettingsIcon className="size-4" />
        Settings
      </Link>
    </div>
  );
}
