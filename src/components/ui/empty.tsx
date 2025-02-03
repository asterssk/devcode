import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = { label?: string; className?: string };

export function Empty({ label, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 items-center justify-center",
        className
      )}
    >
      <Image
        src="/icons/empty-box.png"
        height={50}
        width={50}
        alt="empty"
        quality={50}
      />

      <p className="text-sm text-muted-foreground">
        {label ?? "No record found."}
      </p>
    </div>
  );
}
