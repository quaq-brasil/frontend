import Image from "next/image"
import { Trash } from "phosphor-react"
import { useEffect, useState } from "react"
import { IBlock } from "../../types/Block.types"
import { IInteractionData } from "../../types/Interaction.type"

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
    <div
      className="flex relative justify-center content-center
            min-w-[100%] h-[13.0625rem]  lg:h-[19rem]"
    >
      {isEditable && (
        <button
          onClick={onDelete}
          className="z-10 absolute flex justify-start right-0 top-0 content-center
          rounded-full bg-white border border-slate-100"
        >
          <Trash className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </button>
      )}
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
    </div>
  )
}
