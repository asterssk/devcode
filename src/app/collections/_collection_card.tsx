"use client";

import { CollectionMenuButton } from "@/components/global/menus/collection";
import { Card, CardContent } from "@/components/ui/card";
import { TVisibility } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LibraryBigIcon } from "lucide-react";

type Props = {
  id: string;
  username: string;
  slug: string;
  name: string;
  isOwner: boolean;
  visibility: TVisibility;
  color: string | null;
  updatedAt?: string;
};

export function CollectionCard({ id, name, username, color }: Props) {
  return (
    <Card
      className={cn(
        "flex flex-col py-2 px-3",
        "hover:bg-secondary hover:scale-[1.01] transition-all"
      )}
    >
      <CardContent className="flex justify-between items-center gap-2">
        <LibraryBigIcon
          color={color ? color : "#808080"}
          className="size-4.5"
        />

        <span className="line-clamp-1 font-semibold text-sm text-nowrap">
          {name}
        </span>

        <CollectionMenuButton id={id} className="ml-auto" />
      </CardContent>
    </Card>
  );
}
