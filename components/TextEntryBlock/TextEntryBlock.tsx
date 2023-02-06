import { Trash } from "phosphor-react"
import { useEffect, useState } from "react"
import { IBlock } from "../../types/Block.types"
import { IInteractionData } from "../../types/Interaction.type"
import { TextEntry } from "./TextEntry"

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
}

export const TextEntryBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
}: TextEntryBlockProps) => {
  const [value, setValue] = useState("")

  const onInteraction = () => {
    handleUpdateInteractions &&
      handleUpdateInteractions({
        id: block.id as string,
        saveAs: block.saveAs as string,
        type: block.type as string,
        data: {
          type: block.data.type,
          value,
        },
      })
  }

  useEffect(() => {
    onInteraction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div className="flex relative min-w-[100%] justify-end content-center">
      {isEditable && (
        <button
          onClick={onDelete}
          className="z-10 absolute flex justify-start content-center rounded-full bg-white border border-slate-100"
        >
          <Trash className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </button>
      )}
      <div
        className="flex justify-between items-center
            min-w-[100%] bg-white py-[1.125rem] rounded-[20px] lg:rounded-[30px] lg:py-[1.275rem]"
      >
        <div className="w-full">
          <TextEntry
            placeholder={block.data.placeholder}
            type={block.data.type}
            onChange={setValue}
          />
        </div>
      </div>
    </div>
  )
}
