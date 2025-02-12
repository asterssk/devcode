"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SnippetForm } from "./_form";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";

export default function Page() {
  const router = useRouter();
  const [isFormDirty] = useQueryState("dirty");
  const id = useSearchParams().get("id");
  const isNew = !id;

  return (
    <Dialog open onOpenChange={(isOpen) => (isOpen ? {} : router.back())}>
      <DialogContent
        variant="full"
        onEscapeKeyDown={(e) => {
          if (isFormDirty) e.preventDefault();
        }}
        onInteractOutside={(e) => {
          if (isFormDirty) e.preventDefault();
        }}
      >
        <DialogHeader className="space-y-0 text-left">
          <DialogTitle className="border-b border-border px-4 py-3 text-base capitalize">
            {isNew ? "Create New" : "Update"} Code Snippet
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only" />

        <div className="overflow-y-auto flex-1 bg-background flex flex-col">
          <SnippetForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
