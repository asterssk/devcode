"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  FileCodeIcon,
  LibraryBigIcon,
  LogOut,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function UserAvatar({
  user,
}: {
  user: { name: string; email: string; avatar: string };
}) {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={isMobile ? "icon" : "sm"}
          className={cn(
            "flex items-center justify-between gap-3",
            isMobile ? "" : "pl-[2px] pr-1.5"
          )}
        >
          <Avatar
            className={cn(
              "rounded-md",
              isMobile ? "size-[2.25rem]" : "size-[1.85rem]"
            )}
          >
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback
              className={cn("rounded-md", isMobile ? "bg-transparent" : "")}
            >
              <UserIcon />
            </AvatarFallback>
          </Avatar>

          {isMobile ? null : (
            <>
              <ChevronsUpDown className="size-3" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg space-y-1"
        // side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={5}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">
                <UserIcon className="size-4" />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate text-sm font-semibold">
                {user.name}
              </span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href="/account" passHref>
            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
          </Link>

          <Link href="/posts" passHref>
            <DropdownMenuItem>
              <FileCodeIcon />
              My posts
            </DropdownMenuItem>
          </Link>

          <Link href="/collections" passHref>
            <DropdownMenuItem>
              <LibraryBigIcon />
              My collections
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
