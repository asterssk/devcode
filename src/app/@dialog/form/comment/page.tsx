"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BanIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();

  // [write] Write a comment to a post
  // [reply] Reply to a comment
  // [edit] Update own comment
  const intent = useSearchParams().get("intent") ?? "write";

  // {post id} if intent is [write]
  // {comment id} if intent is [reply] or [update]
  const id = useSearchParams().get("id");

  return (
    <Dialog open onOpenChange={(isOpen) => (isOpen ? {} : router.back())}>
      <DialogContent>
        <DialogHeader className="space-y-0 text-left">
          <DialogTitle className="border-b border-border px-4 py-3 text-base">
            {intent === "reply"
              ? "Reply to a comment"
              : intent === "edit"
              ? "Edit comment"
              : "Write a comment"}
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only" />

        {!id ? (
          <div className="flex flex-col my-10 text-muted-foreground items-center ">
            <BanIcon className="mb-4" />
            <span className="text-center text-sm">
              Invalid comment reference
            </span>
            <p className="text-xs">Please refresh the page</p>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1 bg-background flex flex-col">
            <p>{intent}</p>
            <p>{id}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
