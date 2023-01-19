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
      className="grid grid-cols-2 gap-y-2 gap-x-[0.625rem] mb-20 mx-auto
      md:gap-y-10 md:gap-x-10 md:grid-cols-3 place-items-center md:mx-12 md:mt-10"
    >
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </div>
  );
};
