import dynamic from "next/dynamic"
import { Star } from "phosphor-react"
import { useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

type IDropDownMenuBlock = {
  data: any
} & IBlock

type DropDownMenuBlock = {
  block: IDropDownMenuBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

export const DropDownMenuBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: DropDownMenuBlock) => {
  type IEvent = {
    displayedAt?: string
    lastInteractionAt?: string
    firstInteractionAt?: string
  }

  const [review, setReview] = useState(0)
  const [events, setEvents] = useState<IEvent>()

  function handleUpdateEvents(newEvent: IEvent) {
    setEvents((state) => {
      return {
        ...state,
        ...newEvent,
      } as IEvent
    })
  }

  function handleUpdateSelected(option: number) {
    if (!events?.firstInteractionAt) {
      const firstAndLast = new Date().toString()
      handleUpdateEvents({
        firstInteractionAt: firstAndLast,
        lastInteractionAt: firstAndLast,
      })
    } else {
      const lastInteractionAt = new Date().toString()
      handleUpdateEvents({ lastInteractionAt: lastInteractionAt })
    }
    setReview(option)
  }

  const onInteraction = () => {
    handleUpdateInteractions &&
      handleUpdateInteractions({
        id: block.id,
        config: {
          id: block.id,
          save_as: block.save_as,
          type: block.type,
          data: {},
        },
        output: {
          events: events,
          data: {
            current_review: review,
          },
        },
      })
  }

  useEffect(() => {
    onInteraction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [review])

  useEffect(() => {
    if (!events?.displayedAt) {
      const displayedAt = new Date().toString()
      handleUpdateEvents({ displayedAt: displayedAt })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex relative justify-end">
      {isEditable === true && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      <div
        className="flex flex-col w-full justify-center items-center bg-white 
          p-[0.75rem] rounded-[20px] lg:rounded-[30px]"
      >
        <div className="flex flex-row justify-between py-3 w-full px-[20%] md:px-[35%] ">
          <button onClick={() => handleUpdateSelected(1)}>
            <Star
              className={`w-[1.75rem] h-[1.75rem] lg:w-[2rem] lg:h-[2rem] ${
                review > 0 ? "text-yellow-500" : "text-slate-200"
              }`}
              weight="fill"
            />
          </button>
          <button onClick={() => handleUpdateSelected(2)}>
            <Star
              className={`w-[1.75rem] h-[1.75rem] lg:w-[2rem] lg:h-[2rem] ${
                review > 1 ? "text-yellow-500" : "text-slate-200"
              }`}
              weight="fill"
            />
          </button>
          <button onClick={() => handleUpdateSelected(3)}>
            <Star
              className={`w-[1.75rem] h-[1.75rem] lg:w-[2rem] lg:h-[2rem] ${
                review > 2 ? "text-yellow-500" : "text-slate-200"
              }`}
              weight="fill"
            />
          </button>
          <button onClick={() => handleUpdateSelected(4)}>
            <Star
              className={`w-[1.75rem] h-[1.75rem] lg:w-[2rem] lg:h-[2rem] ${
                review > 3 ? "text-yellow-500" : "text-slate-200"
              }`}
              weight="fill"
            />
          </button>
          <button onClick={() => handleUpdateSelected(5)}>
            <Star
              className={`w-[1.75rem] h-[1.75rem] lg:w-[2rem] lg:h-[2rem] ${
                review > 4 ? "text-yellow-500" : "text-slate-200"
              }`}
              weight="fill"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
