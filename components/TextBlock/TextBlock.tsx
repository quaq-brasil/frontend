import parse from "html-react-parser"
import { IBlock } from "../../types/Block.types"

type TextBlockProps = {
  block: ITextBlock
}

type ITextBlock = {
  data: string
} & IBlock

export const TextBlock = ({ block }: TextBlockProps) => {
  return (
    <div className="prose prose-headings:m-0 prose-p:m-0 focus:outline-none">
      {parse(block.data)}
    </div>
  )
}
