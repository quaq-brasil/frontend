import { Trash } from "phosphor-react"
import { IBlock } from "../../types/Block.types"

type IData = {
  text: string
  color: string
  onClick?: () => void
}

type IReviewBlock = {
  data: IData
} & IBlock

type ButtonProps = {
  block: IReviewBlock
  isEditable: boolean
  onDelete?: () => void
}

export function Button({ block, isEditable, onDelete }: ButtonProps) {
  return (
    <div className="w-full h-fit relative">
      {isEditable === true && (
        <button
          onClick={onDelete}
          className="z-10 absolute right-0 top-0 rounded-full bg-white border border-slate-100"
        >
          <Trash className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </button>
      )}
      <button
        onClick={block.data.onClick}
        className={`flex relative justify-between items-center 
        p-[0.75rem] md:p-[1rem] lg:p-[1.5rem] min-w-[100%]
        rounded-[20px] lg:rounded-[30px] ${block.data.color}`}
      >
        <span
          className={`lg:text-[1.1rem] font-semibold text-center w-full ${
            block.data.color == "bg-white" ? "text-black" : "text-white"
          }`}
        >
          {block.data.text}
        </span>
      </button>
    </div>
  )
}
