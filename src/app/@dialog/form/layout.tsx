"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const id = useSearchParams().get("id");
  const isNew = !id;

  const screenForms = ["snippet"] as const;

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent
        className="overflow-clip"
        variant={
          screenForms.some((e) => e === segment?.toLowerCase())
            ? "full"
            : "default"
        }
      >
        <DialogHeader className="space-y-0 text-left">
          <DialogTitle className="border-b border-border px-4 py-3 text-base capitalize">
            {isNew ? "Create New" : "Update"} {segment}
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only">
          This action cannot be undone.
        </DialogDescription>

        <div className="overflow-y-auto flex-1 bg-background flex flex-col">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
