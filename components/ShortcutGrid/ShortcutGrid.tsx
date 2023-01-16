import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { ReactNode } from "react";

type ShortcutGridProps = {
  children: ReactNode[];
  onDrag: (event: any) => void;
};

export const ShortcutGrid = ({ children, onDrag }: ShortcutGridProps) => {
  const items = children.map((child, index) => {
    return {
      id: index,
      content: child,
    };
  });

  return (
    <ul
      className="grid mt-2 mb-9 px-3 grid-cols-2 gap-3
      md:gap-8 md:mt-8 md:grid-cols-3 max-w-3xl md:mx-auto"
    >
      <DndContext onDragEnd={onDrag}>
        <SortableContext items={items}>{children}</SortableContext>
      </DndContext>
    </ul>
  );
};
