import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const Image = dynamic(() => import("next/image").then((mod) => mod.default))

const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

type ImageProps = {
  data: {
    img_url: string
  }
} & IBlock

type ImageBlockProps = {
  block: ImageProps
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

export const ImageBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: ImageBlockProps) => {
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

  useEffect(() => {
    onInteraction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  return (
    <div
      className="flex relative justify-center content-center
            min-w-[100%] h-[13.0625rem]  lg:h-[19rem]"
    >
      {isEditable && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      {block.data.img_url ? (
        <Image
          className="rounded-[20px] lg:rounded-[30px]"
          src={block.data.img_url}
          fill
          style={{ objectFit: "cover" }}
          alt={""}
        />
      ) : (
        <div className="min-w-full min-h-full bg-slate-300 animate-pulse rounded-[20px] lg:rounded-[30px]"></div>
      )}
    </div>
  )
}
