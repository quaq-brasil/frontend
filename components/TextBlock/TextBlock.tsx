import parse from "html-react-parser"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { IBlock } from "../../types/Block.types"
import { IInteractionData } from "../../types/Interaction.type"
const BlockMenu = dynamic(
  () => import("../BlockMenu/BlockMenu").then((mod) => mod.default),
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
    <div className="flex relative min-w-[100%]">
      {isEditable && <BlockMenu />}
      <div
        className="min-w-[100%] px-3 py-3 bg-white lg:px-[1rem] lg:py-[1rem]
        rounded-[20px] lg:rounded-[30px] text-black lg:text-[1.1rem]"
      >
        {parse(block.data)}
      </div>
    </div>
  )
}
