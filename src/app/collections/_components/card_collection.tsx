"use client";

import { CollectionMenuButton } from "@/components/global/menus/collection";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LibraryBigIcon } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useDndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { InferSelectModel } from "drizzle-orm";
import { collection } from "db/schema/collection";

type Props = { collection: InferSelectModel<typeof collection> };

export function CollectionCard({ collection }: Props) {
  const { active } = useDndContext();

  const {
    attributes,
    listeners,
    transform,
    setNodeRef: setDragRef,
  } = useDraggable({ id: collection.id });

  const { isOver, setNodeRef: setDropRef } = useDroppable({
    id: collection.id,
    disabled: active?.id === collection.id,
  });

  return (
    <Card
      ref={(node) => {
        setDragRef(node);
        setDropRef(node);
      }}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform) }}
      onDoubleClick={() => alert(collection.id)}
      className={cn(
        "flex flex-col py-2 px-3",
        "hover:bg-secondary transition-color",
        isOver ? "bg-primary/10 border-primary" : ""
      )}
    >
      <CardContent className="flex justify-between items-center gap-2">
        <LibraryBigIcon
          color={collection.color ? collection.color : "#808080"}
          className="size-4.5"
        />

        <span className="line-clamp-1 text-[0.85rem] text-nowrap cursor-default">
          {collection.name}
        </span>

        <CollectionMenuButton id={collection.id} className="ml-auto" />
      </CardContent>
    </Card>
  );
}
