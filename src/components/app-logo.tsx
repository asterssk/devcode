"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { kAppAbbr, kAppName } from "@/constants";
import { cn } from "@/lib/utils";

export function AppLogo() {
  return (
    <div className="flex items-center gap-3">
      <Avatar className={cn("rounded-md size-9")}>
        <AvatarFallback className={cn("rounded-md")}>{kAppAbbr}</AvatarFallback>
      </Avatar>

      <span className="truncate font-semibold text-xl">
        {kAppName.toUpperCase()}
      </span>
    </div>
  );
}
