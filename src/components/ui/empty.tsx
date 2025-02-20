import Image from "next/image";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = { label?: string; children?: ReactNode; className?: string };

export function Empty({ label, className, children }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 items-center justify-center",
        className
      )}
    >
      {children ?? (
        <Image
          src="/icons/empty-box.png"
          height={50}
          width={50}
          alt="empty"
          quality={50}
        />
      )}

      {label ? (
        <p className="text-muted-foreground text-center text-sm">
          {label ?? "No record found."}
        </p>
      ) : null}
    </div>
  );
}
