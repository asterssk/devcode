"use client";

import { ReactNode } from "react";
import {
  DndContext,
  pointerWithin,
  MouseSensor,
  useSensor,
} from "@dnd-kit/core";
import { snapTopLeftToCursor } from "@/lib/dnd-modifiers/snap-top-left-to-cursor";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";

type Props = { children: ReactNode };

export function CollectionContentWrapper({ children }: Props) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  return (
    <DndContext
      sensors={[mouseSensor]}
      collisionDetection={pointerWithin}
      modifiers={[snapTopLeftToCursor, restrictToFirstScrollableAncestor]}
      //   onDragEnd={(event) => {
      //     const { active, over } = event;
      //     if (!over || active.id === over.id) return;
      //   }}
    >
      {children}
    </DndContext>
  );
}
