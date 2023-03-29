import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const Embed = dynamic(() => import("react-embed"), {
  ssr: false,
})

const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

type IData = {
  link: string
}

type IEmbedBlock = {
  data: IData
} & IBlock

type EmbedBlockProps = {
  block: IEmbedBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

type IEvent = {
  displayedAt: string
}

export const EmbedBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: EmbedBlockProps) => {
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
  }, [block, handleUpdateInteractions, events])

  useEffect(() => {
    if (!events?.displayedAt) {
      setEvents({ displayedAt: new Date().toString() })
    }

    if (events) {
      onInteraction()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  console.log(block.data.link)

  return (
    <div className="flex relative justify-end">
      {isEditable === true && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      <div
        className="flex relative justify-between items-center
        min-w-[100%] bg-white 
        p-[0.75rem] rounded-[20px] lg:rounded-[30px]"
      >
        <Embed url={block.data.link} />
      </div>
    </div>
  )
}
