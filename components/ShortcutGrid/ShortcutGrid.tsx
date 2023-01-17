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
    <div
      className="grid grid-cols-2 gap-y-2 gap-x-[0.625rem] mb-20 mx-auto
      md:gap-y-10 md:gap-x-10 md:grid-cols-3 place-items-center md:mx-12 md:mt-10"
    >
      {/* <DndContext onDragEnd={onDrag}>
        <SortableContext items={items}>{children}</SortableContext>
      </DndContext> */}
      {children}
    </div>
  );
};
