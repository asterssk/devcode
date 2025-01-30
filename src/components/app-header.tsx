"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Props = { title?: ReactNode; className?: string; children?: ReactNode };

export function AppHeader({ title, className, children }: Props) {
  const router = useRouter();

  return (
    <div className={cn("flex gap-4 items-center justify-between", className)}>
      <div className="flex items-center gap-5">
        <Button size="icon" variant="secondary" onClick={() => router.back()}>
          <ArrowLeftIcon />
        </Button>
        <h1 className="flex-1 text-xl">{title}</h1>
      </div>

      {children}
    </div>
  );
}
