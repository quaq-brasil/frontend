import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"
import { TextEntry } from "./TextEntry"
const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

type ITextEntry = {
  data: {
    type: "text" | "long-text" | "number" | "email" | "password" | "url"
    placeholder?: string
  }
} & IBlock

type TextEntryBlockProps = {
  block: ITextEntry
  isEditable?: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

export const TextEntryBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: TextEntryBlockProps) => {
  type IEvent = {
    displayedAt?: string
    lastInteractionAt?: string
    firstInteractionAt?: string
  }

  const [events, setEvents] = useState<IEvent>()
  const [value, setValue] = useState("")

  function handleUpdateValue(text: string) {
    if (events?.firstInteractionAt) {
      const lastInteractionAt = new Date().toString()
      handleUpdateEvents({ lastInteractionAt: lastInteractionAt })
      setValue(text)
    } else {
      const firstAndLast = new Date().toString()
      handleUpdateEvents({
        firstInteractionAt: firstAndLast,
        lastInteractionAt: firstAndLast,
      })
      setValue(text)
    }
  }

  function handleUpdateEvents(newEvent: IEvent) {
    setEvents((state) => {
      return {
        ...state,
        ...newEvent,
      } as IEvent
    })
  }

  useEffect(() => {
    if (!events?.displayedAt) {
      const displayedAt = new Date().toString()
      handleUpdateEvents({ displayedAt: displayedAt })
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
          data: {
            placeholder: block.data.placeholder,
            type: block.data.type,
          },
        },
        output: {
          events: events,
          data: {
            value: value,
          },
        },
      })
  }

  useEffect(() => {
    onInteraction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, events])

  return (
    <div className="flex relative min-w-[100%] justify-end content-center">
      {isEditable && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      <div
        className="flex justify-between items-center
            min-w-[100%] bg-white py-[1.125rem] rounded-[20px] lg:rounded-[30px] lg:py-[1.275rem]"
      >
        <div className="w-full lg:my-1">
          <TextEntry
            placeholder={block.data.placeholder}
            type={block.data.type}
            onChange={handleUpdateValue}
          />
        </div>
      </div>
    </div>
  )
}
