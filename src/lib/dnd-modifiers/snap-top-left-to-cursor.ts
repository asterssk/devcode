import type { ClientRect } from "@dnd-kit/core";
import { getEventCoordinates, Transform } from "@dnd-kit/utilities";

export function snapTopLeftToCursor({
  activatorEvent,
  draggingNodeRect,
  transform,
}: {
  activatorEvent: Event | null;
  draggingNodeRect: ClientRect | null;
  transform: Transform;
}): Transform {
  const offset = 5;

  if (draggingNodeRect && activatorEvent) {
    const activatorCoordinates = getEventCoordinates(activatorEvent);

    if (!activatorCoordinates) {
      return transform;
    }

    const offsetX = activatorCoordinates.x - draggingNodeRect.left - offset;
    const offsetY = activatorCoordinates.y - draggingNodeRect.top - offset;

    return {
      ...transform,
      x: transform.x + offsetX,
      y: transform.y + offsetY,
    };
  }

  return transform;
}
