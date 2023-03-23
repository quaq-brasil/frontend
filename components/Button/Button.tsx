import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

interface IData {
  text: string
  color: string
  onClick?: () => void
}

interface IReviewBlock extends IBlock {
  data: IData
}

interface ButtonProps {
  block: IReviewBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

interface IEvent {
  displayedAt?: string
  lastInteractionAt?: string
  firstInteractionAt?: string
}

export function Button({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: ButtonProps) {
  const [clicked, setClicked] = useState(false)
  const [events, setEvents] = useState<IEvent>({})

  function handleUpdateEvents(newEvent: Partial<IEvent>) {
    setEvents((prevState) => ({ ...prevState, ...newEvent }))
  }

  function handleUpdateClicked() {
    if (!clicked) setClicked(true)
    if (events.firstInteractionAt) {
      const firstAndLast = new Date().toISOString()
      handleUpdateEvents({
        firstInteractionAt: firstAndLast,
        lastInteractionAt: firstAndLast,
      })
    } else {
      const lastInteractionAt = new Date().toISOString()
      handleUpdateEvents({ lastInteractionAt })
    }
  }

  const onInteraction = () => {
    handleUpdateInteractions?.({
      id: block.id,
      config: {
        id: block.id,
        save_as: block.save_as,
        type: block.type,
        data: {
          text: block.data.text,
          color: block.data.color,
        },
      },
      output: {
        events,
        data: { clicked },
      },
    })
  }

  useEffect(() => {
    onInteraction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  useEffect(() => {
    if (!events.displayedAt) {
      const displayedAt = new Date().toISOString()
      handleUpdateEvents({ displayedAt })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full h-fit relative">
      {isEditable && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      <button
        onClick={() => {
          block.data.onClick?.()
          handleUpdateClicked()
        }}
        className={`flex relative justify-between items-center p-[0.75rem] md:p-[1rem] lg:p-[1.5rem] min-w-[100%] rounded-[20px] lg:rounded-[30px] ${block.data.color}`}
      >
        <span
          className={`lg:text-[1.1rem] font-semibold text-center w-full ${
            block.data.color === "bg-white" ? "text-black" : "text-white"
          }`}
        >
          {block.data.text}
        </span>
      </button>
    </div>
  )
}
