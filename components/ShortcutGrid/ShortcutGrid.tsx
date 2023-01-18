import { ReactNode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type ShortcutGridProps = {
  children: ReactNode[];
  onDrag: (event: any) => void;
};

export const ShortcutGrid = ({ children, onDrag }: ShortcutGridProps) => {
  return (
    <div
      className="grid grid-cols-2 gap-y-2 gap-x-[0.625rem] mb-20
      lg:gap-y-10 lg:gap-x-10 md:mt-12 lg:grid-cols-3 max-w-[900px] mx-auto place-items-center"
    >
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </div>
  );
};
