import { Star, Trash } from "phosphor-react"
import { useEffect, useState } from "react"
import { IBlock } from "../../types/Block.types"
import { IInteractionData } from "../../types/Interaction.type"
import { CardLine } from "../Card/CardContentVariants/CardLine"

type IData = {
  description: string
}

type IReviewBlock = {
  data: IData
} & IBlock

type ReviewBlockProps = {
  block: IReviewBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
}

export const ReviewBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
}: ReviewBlockProps) => {
  type IEvent = {
    displayedAt?: string
    lastInteractionAt?: string
    firstInteractionAt?: string
  }

  const [review, setReview] = useState(0)
  const [events, setEvents] = useState<IEvent>()

  function handleUpdateEvents(newEvent: IEvent) {
    setEvents({
      displayedAt: newEvent.displayedAt || events?.displayedAt,
      firstInteractionAt:
        newEvent.firstInteractionAt || events?.firstInteractionAt,
      lastInteractionAt:
        newEvent.lastInteractionAt || events?.lastInteractionAt,
    })
  }

  function handleUpdateSelected(option: number) {
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
    setReview(option)
  }

  const onInteraction = () => {
    handleUpdateInteractions &&
      handleUpdateInteractions({
        config: {
          id: block.id as string,
          saveAs: block.saveAs as string,
          type: block.type as string,
          data: {
            description: block.data.description,
          },
        },
        output: {
          events: events,
          data: {
            curentReview: review,
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
      {isEditable === true && (
        <button
          onClick={onDelete}
          className="z-10 absolute right-0 top-0 rounded-full bg-white border border-slate-100"
        >
          <Trash className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </button>
      )}
      <div
        className="flex flex-col w-full justify-center items-center bg-white 
          p-[0.75rem] rounded-[20px] lg:rounded-[30px]"
      >
        <p className="pb-3 px-1 font-semibold lg:text-[1.1rem] lg:px-[1.125rem]">
          {block.data.description}
        </p>
        <CardLine />
        <div className="flex flex-row justify-between pt-3 pb-2 w-full px-[20%] md:px-[25%] ">
          <button onClick={() => handleUpdateSelected(1)}>
            <Star
              className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${
                review > 0 ? "text-yellow-500" : "text-slate-200"
              }`}
              weight="fill"
            />
          </button>
          <button onClick={() => handleUpdateSelected(2)}>
            <Star
              className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${
                review > 1 ? "text-yellow-500" : "text-slate-200"
              }`}
              weight="fill"
            />
          </button>
          <button onClick={() => handleUpdateSelected(3)}>
            <Star
              className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${
                review > 2 ? "text-yellow-500" : "text-slate-200"
              }`}
              weight="fill"
            />
          </button>
          <button onClick={() => handleUpdateSelected(4)}>
            <Star
              className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${
                review > 3 ? "text-yellow-500" : "text-slate-200"
              }`}
              weight="fill"
            />
          </button>
          <button onClick={() => handleUpdateSelected(5)}>
            <Star
              className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${
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
