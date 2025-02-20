"use client";

import { CollectionMenuButton } from "@/components/global/menus/collection";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LibraryBigIcon, Loader2 } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useDndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { InferSelectModel } from "drizzle-orm";
import { collection } from "db/schema/collection";
import { useTransition } from "react";

type Props = {
  collection: InferSelectModel<typeof collection>;
  onRoute?: () => void;
};

export function CollectionCard({ collection, onRoute }: Props) {
  const [pending, startTransition] = useTransition();
  const { active } = useDndContext();

  const {
    isDragging,
    attributes,
    listeners,
    transform,
    setNodeRef: setDragRef,
  } = useDraggable({ id: collection.id });

  const { isOver, setNodeRef: setDropRef } = useDroppable({
    id: collection.id,
    disabled: active?.id === collection.id,
  });

  const handleRoute = () => {
    if (pending) return;
    startTransition(() => {
      onRoute && onRoute();
    });
  };

  return (
    <Card
      ref={(node) => {
        setDragRef(node);
        setDropRef(node);
      }}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform) }}
      onDoubleClick={isDragging ? undefined : handleRoute}
      className={cn(
        "flex flex-col py-2 px-3 select-none",
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

        {pending ? (
          <span className="h-[1.9rem] flex items-center ml-auto">
            <Loader2 className="animate-spin size-5" />
          </span>
        ) : (
          <CollectionMenuButton id={collection.id} className="ml-auto" />
        )}
      </CardContent>
    </Card>
  );
}
