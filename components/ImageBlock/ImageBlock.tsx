import dynamic from "next/dynamic"
import Image from "next/image"
import { useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

interface ImageProps extends IBlock {
  data: {
    img_url: string
  }
}

interface ImageBlockProps {
  block: ImageProps
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

interface IEvent {
  displayedAt: string
}

export const ImageBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: ImageBlockProps) => {
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

  useEffect(() => {
    if (events) {
      handleUpdateInteractions?.({
        id: block.id,
        config: {
          id: block.id,
          save_as: block.save_as,
          type: block.type,
          data: block.data.img_url,
        },
        output: {
          events: events,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  return (
    <div className="flex relative justify-center items-center w-full h-52 lg:h-76">
      {isEditable && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      {block.data.img_url ? (
        <Image
          className="rounded-lg lg:rounded-xl"
          src={block.data.img_url}
          fill
          style={{ objectFit: "cover" }}
          alt={""}
          loading="lazy"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      ) : (
        <div className="w-full h-full bg-slate-300 animate-pulse rounded-lg lg:rounded-xl"></div>
      )}
    </div>
  )
}
