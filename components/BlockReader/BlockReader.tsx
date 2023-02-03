import { IBlock } from "../../types/Block.types"
import { ImageBlock } from "../ImageBlock/ImageBlock"
import { PoolBlock } from "../PoolBlock/PoolBlock"
import { ReviewBlock } from "../ReviewBlock/ReviewBlock"
import { TextBlock } from "../TextBlock/TextBlock"
import { TextEntry } from "../TextEntryBlock/TextEntry"

export type BlockProps = {
  data: any
} & IBlock

type BlockReaderProps = {
  block: BlockProps
  isEditable?: boolean
}

export const BlockReader = ({
  block,
  isEditable = false,
}: BlockReaderProps) => {
  switch (block.type) {
    case "text":
      return (
        <div className="flex flex-col px-3 py-3 justify-center min-w-[100%] bg-white  rounded-[20px] lg:rounded-[30px] lg-px[1.125rem]">
          <TextBlock block={block} isEditable={true} />
        </div>
      )
    case "pool":
      return <PoolBlock block={block} isEditable={true} />
    case "image":
      return <ImageBlock block={block} isEditable={true} />
    case "review":
      return <ReviewBlock block={block} isEditable={true} />
    case "textentry":
      return <TextEntry block={block} />
    default:
      return (
        <>
          <h1>um bloco</h1>
        </>
      )
  }
}
