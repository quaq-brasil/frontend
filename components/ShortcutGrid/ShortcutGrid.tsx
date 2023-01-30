import { ReactNode } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

type ShortcutGridProps = {
  children: ReactNode[]
  onDrag: (event: any) => void
}

export const ShortcutGrid = ({ children, onDrag }: ShortcutGridProps) => {
  return (
    <div
      className="grid grid-cols-2 gap-y-2 gap-x-2 mb-20 mx-auto sm:grid-cols-3
      md:grid-cols-4 place-items-center lg:mx-6 lg:mt-5 lg:gap-7"
    >
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </div>
  )
}
