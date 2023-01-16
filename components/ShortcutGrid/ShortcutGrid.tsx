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
      className="grid mt-2 mb-9 grid-cols-2 gap-3
      lg:gap-4  md:mt-8 lg:grid-cols-3"
    >
      {/* <DndContext onDragEnd={onDrag}>
        <SortableContext items={items}>{children}</SortableContext>
      </DndContext> */}
      {children}
    </ul>
  );
};
