"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = { title?: ReactNode; className?: string; children?: ReactNode };

export function AppHeader({ title, className, children }: Props) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex gap-4 items-center px-4 sm:px-0",
        children ? "justify-between" : "justify-start",
        className
      )}
    >
      <Button
        size="icon"
        variant="secondary"
        onClick={() => router.back()}
        className="cursor-pointer"
      >
        <ArrowLeftIcon />
      </Button>

      {typeof title === "string" ? (
        <h1 className="flex-1 text-xl">{title}</h1>
      ) : (
        title
      )}

      {children}
    </div>
  );
}
