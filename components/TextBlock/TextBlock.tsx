import parse from "html-react-parser"
import { Trash } from "phosphor-react"
import { useEffect, useState } from "react"
import { IBlock } from "../../types/Block.types"
import { IInteractionData } from "../../types/Interaction.type"

type ITextBlock = {
  data: string
} & IBlock

type TextBlockProps = {
  block: ITextBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
}

export const TextBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
}: TextBlockProps) => {
  type IEvent = {
    displayedAt: string
  }

  const [events, setEvents] = useState<IEvent>()

  useEffect(() => {
    if (!events?.displayedAt) {
      const event = {
        displayedAt: new Date().toString(),
      }
      setEvents(event)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onInteraction = () => {
    handleUpdateInteractions &&
      handleUpdateInteractions({
        config: {
          id: block.id as string,
          saveAs: block.saveAs as string,
          type: block.type as string,
          data: block.data,
        },
        output: {
          events: events,
        },
      })
  }

  useEffect(() => {
    onInteraction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  return (
    <div className="flex relative min-w-[100%] content-center">
      {isEditable && (
        <button
          onClick={onDelete}
          className="z-10 absolute right-[-12px] top-[-12px] content-center
          rounded-full bg-white border border-slate-100"
        >
          <Trash className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </button>
      )}
      <div
        className="min-w-[100%] bg-white px-1 lg:px-[0.5rem]  
        rounded-[20px] lg:rounded-[30px] text-black lg:text-[1.1rem]"
      >
        {parse(block.data)}
      </div>
    </div>
  )
}
