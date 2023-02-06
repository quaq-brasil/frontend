import { Trash } from "phosphor-react"
import { IBlock } from "../../types/Block.types"
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
}

export const TextEntryBlock = ({
  block,
  isEditable,
  onDelete,
}: TextEntryBlockProps) => {
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
          />
        </div>
      </div>
    </div>
  )
}
