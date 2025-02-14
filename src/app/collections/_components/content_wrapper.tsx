"use client";

import { ReactNode } from "react";
import { DndContext, pointerWithin } from "@dnd-kit/core";

type Props = { children: ReactNode };

export function CollectionContentWrapper({ children }: Props) {
  return (
    <DndContext
      collisionDetection={pointerWithin}
      //   onDragEnd={(event) => {
      //     const { active, over } = event;
      //     if (!over || active.id === over.id) return;
      //   }}
    >
      {children}
    </DndContext>
  );
}
