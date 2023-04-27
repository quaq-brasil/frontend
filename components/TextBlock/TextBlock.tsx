import parse from "html-react-parser"
import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

type ITextBlock = {
  data: string
} & IBlock

type TextBlockProps = {
  block: ITextBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

type IEvent = {
  displayedAt: string
}

export const TextBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: TextBlockProps) => {
  const [events, setEvents] = useState<IEvent>()

  const onInteraction = useCallback(() => {
    handleUpdateInteractions &&
      handleUpdateInteractions({
        id: block.id,
        config: {
          id: block.id,
          save_as: block.save_as,
          type: block.type,
          data: block.data,
        },
        output: {
          events: events,
        },
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block, events])

  useEffect(() => {
    if (events) {
      onInteraction()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  return (
    <div className="flex relative min-w-[100%]">
      {isEditable && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      <div
        className="min-w-[100%] px-3 py-3 bg-white lg:px-[1rem] lg:py-[1rem]
        rounded-[20px] lg:rounded-[30px] text-black lg:text-[1.1rem] prose prose-headings:m-0 prose-p:m-0 focus:outline-none"
      >
        {parse(block?.data || "")}
      </div>
    </div>
  )
}
