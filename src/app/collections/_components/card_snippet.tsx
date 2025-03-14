"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";
import { InferSelectModel } from "drizzle-orm";
import { collection } from "db/schema/collection";

type Props = { snippet: InferSelectModel<typeof collection> };

export function SnippetCard({ snippet }: Props) {
  const {
    isDragging,
    attributes,
    listeners,
    transform,
    setNodeRef: setDragRef,
  } = useDraggable({ id: snippet.id });

  return (
    <Card
      key={snippet.id}
      ref={setDragRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Translate.toString(transform) }}
      onDoubleClick={() => alert(snippet.id)}
      className={cn(
        "flex flex-col",
        "hover:bg-secondary transition-colors",
        isDragging ? "shadow-lg" : ""
      )}
    >
      <CardHeader className="py-3 pl-4">
        <div className="flex items-start justify-between">
          <span className="line-clamp-1 text-[0.85rem] text-nowrap cursor-default">
            {snippet.name} {snippet.id}
          </span>

          {/* <CollectionMenuButton id={snippet.id} /> */}
        </div>
      </CardHeader>

      <CardContent className="flex justify-between items-center gap-2 bg-zinc-500/50 h-28"></CardContent>
    </Card>
  );
}
