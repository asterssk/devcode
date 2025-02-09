"use client";

import { CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  EditIcon,
  EllipsisIcon,
  FlagIcon,
  TrashIcon,
  User2Icon,
  UserCheckIcon,
} from "lucide-react";
import { useComment } from "../provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function CommentCardHeader() {
  const { comment, setIsEditing, deleteComment } = useComment();

  const isOwner = false;

  return (
    <CardHeader className="flex-row justify-between pb-2">
      <Link
        href={`/u/${comment.username}`}
        className="flex flex-row items-center gap-1.5 text-muted-foreground text-xs"
      >
        <div className="relative">
          <Avatar className="size-8">
            <AvatarImage
              src={comment.author_avatar}
              alt={comment.author_name}
            />
            <AvatarFallback>
              <User2Icon className="size-5 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          {isOwner ? (
            <Badge
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 min-w-5 border-background px-1.5 -py-1"
              size="xs"
            >
              Me
            </Badge>
          ) : null}
        </div>
        <h3 className="ml-2 text-sm font-semibold text-foreground">
          {comment.author_name}
        </h3>
        •<span>{comment.commented_at}</span>
      </Link>

      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon-xs" variant="ghost" className="h-5 w-5">
              <EllipsisIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg space-y-1"
            align="end"
          >
            {isOwner ? (
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <EditIcon />
                Edit comment
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <UserCheckIcon />
                Follow author
              </DropdownMenuItem>
            )}

            {isOwner ? null : <DropdownMenuSeparator />}

            {isOwner ? (
              <DropdownMenuItem asChild>
                <AlertDialogTrigger className="w-full">
                  <TrashIcon />
                  Delete comment
                </AlertDialogTrigger>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <FlagIcon />
                Report
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete comment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete your
              comment?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardHeader>
  );
}
