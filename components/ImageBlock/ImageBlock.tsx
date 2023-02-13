import dynamic from "next/dynamic"
import Image from "next/image"
import { useEffect, useState } from "react"
import { IBlock } from "../../types/Block.types"
import { IInteractionData } from "../../types/Interaction.type"
const BlockMenu = dynamic(
  () => import("../BlockMenu/BlockMenu").then((mod) => mod.default),
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
}

export const ImageBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
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
        id: block.id as string,
        config: {
          id: block.id as string,
          save_as: block.save_as as string,
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
    <div
      className="flex relative justify-center content-center
            min-w-[100%] h-[13.0625rem]  lg:h-[19rem]"
    >
      {isEditable && <BlockMenu />}
      {block.data.img_url ? (
        <Image
          className="rounded-[20px] lg:rounded-[30px]"
          // mock link
          src={
            "https://images.unsplash.com/photo-1675671233507-c8b670d27525?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          }
          fill
          style={{ objectFit: "cover" }}
          alt={""}
        />
      ) : (
        <div className="min-w-full min-h-full bg-slate-300 animate-pulse"></div>
      )}
    </div>
  )
}
