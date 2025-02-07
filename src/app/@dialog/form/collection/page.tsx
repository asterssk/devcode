"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CollectionForm } from "./_form";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const id = useSearchParams().get("id");
  const isNew = !id;

  return (
    <Dialog open onOpenChange={(isOpen) => (isOpen ? {} : router.back())}>
      <DialogContent>
        <DialogHeader className="space-y-0 text-left">
          <DialogTitle className="border-b border-border px-4 py-3 text-base capitalize">
            {isNew ? "Create New" : "Update"} Collection
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only" />

        <div className="overflow-y-auto flex-1 bg-background flex flex-col">
          <CollectionForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
