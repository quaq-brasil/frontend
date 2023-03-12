import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"
const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.default),
  { ssr: false }
)

type IData = {
  text: string
  color: string
  onClick?: () => void
}

type IReviewBlock = {
  data: IData
} & IBlock

type ButtonProps = {
  block: IReviewBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

export function Button({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: ButtonProps) {
  type IEvent = {
    displayedAt?: string
    lastInteractionAt?: string
    firstInteractionAt?: string
  }

  const [clicked, setClicked] = useState(false)
  const [events, setEvents] = useState<IEvent>()

  function handleUpdateEvents(newEvent: IEvent) {
    setEvents((state) => {
      return {
        ...state,
        ...newEvent,
      }
    })
  }

  function handleUpdateClicked() {
    if (!clicked) {
      setClicked(true)
    }
    if (events?.firstInteractionAt) {
      const firstAndLast = new Date().toString()
      handleUpdateEvents({
        firstInteractionAt: firstAndLast,
        lastInteractionAt: firstAndLast,
      })
    } else {
      const lastInteractionAt = new Date().toString()
      handleUpdateEvents({ lastInteractionAt: lastInteractionAt })
    }
  }

  const onInteraction = () => {
    handleUpdateInteractions &&
      handleUpdateInteractions({
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
          events: events,
          data: {
            clicked: clicked,
          },
        },
      })
  }

  useEffect(() => {
    onInteraction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  useEffect(() => {
    if (!events?.displayedAt) {
      const displayedAt = new Date().toString()
      handleUpdateEvents({ displayedAt: displayedAt })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full h-fit relative">
      {isEditable === true && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      <button
        onClick={() => {
          block.data.onClick && block.data.onClick()
          handleUpdateClicked()
        }}
        className={`flex relative justify-between items-center 
        p-[0.75rem] md:p-[1rem] lg:p-[1.5rem] min-w-[100%]
        rounded-[20px] lg:rounded-[30px] ${block.data.color}`}
      >
        <span
          className={`lg:text-[1.1rem] font-semibold text-center w-full ${
            block.data.color == "bg-white" ? "text-black" : "text-white"
          }`}
        >
          {block.data.text}
        </span>
      </button>
    </div>
  )
}
