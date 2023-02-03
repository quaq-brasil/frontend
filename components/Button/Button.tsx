import { PencilSimple } from "phosphor-react"
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
}

export function Button({ block, isEditable }: ButtonProps) {
  return (
    <div className="w-full h-fit relative">
      {isEditable === true && (
        <div className="z-10 absolute right-0 top-0 rounded-full bg-white border border-slate-100">
          <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </div>
      )}
      <button
        onClick={block.data.onClick}
        className={`flex relative justify-between items-center 
        p-[0.75rem] md:p-[1rem] lg:p-[1.5rem] min-w-[100%]
        rounded-[20px] lg:rounded-[30px] ${block.data.color}`}
      >
        <span
          className={`lg:text-[1.1rem] ${
            block.data.color == "white" ? "text-black" : "text-white"
          } font-semibold text-center w-full`}
        >
          {block.data.text}
        </span>
      </button>
    </div>
  )
}
