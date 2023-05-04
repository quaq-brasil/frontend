import dynamic from "next/dynamic"
import { ReactNode } from "react"

type ShortcutGridProps = {
  children: ReactNode[]
  onDrag?: (event: any) => void
}

const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
)

const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
)
export const ShortcutGrid = ({ children, onDrag }: ShortcutGridProps) => {
  const handleOnDragEnd = (result: any) => {
    console.log("handleOnDragEnd", result)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="shortcuts">
        {(provided) => (
          <ul
            className="grid grid-cols-2 gap-y-2 gap-x-2 mb-20 mx-auto sm:grid-cols-3
      md:grid-cols-4 place-items-center lg:mx-6 lg:mt-5 lg:gap-7"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {children}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}
