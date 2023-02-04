import parse from "html-react-parser"
import { PencilSimple } from "phosphor-react"
import { IBlock } from "../../types/Block.types"

type ITextBlock = {
  data: string
} & IBlock

type TextBlockProps = {
  block: ITextBlock
  isEditable: boolean
}

export const TextBlock = ({ block, isEditable }: TextBlockProps) => {
  return (
    <div className="flex relative min-w-[100%] content-center">
      {isEditable && (
        <div
          className="z-10 absolute right-[-12px] top-[-12px] content-center
          rounded-full bg-white border border-slate-100"
        >
          <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </div>
      )}
      <div
        className="min-w-[100%] bg-white px-1 lg:px-[0.5rem]  
        rounded-[20px] lg:rounded-[30px] text-black lg:text-[1.1rem]"
      >
        {parse(block.data)}
      </div>
    </div>
  )
}
