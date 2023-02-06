import { BlockProps } from "../../types/Block.types"
import { IInteractionData } from "../../types/Interaction.type"
import { Button } from "../Button/Button"
import { ChartBlock } from "../ChartBlock/ChartBlock"
import { ImageBlock } from "../ImageBlock/ImageBlock"
import { PoolBlock } from "../PoolBlock/PoolBlock"
import { ReviewBlock } from "../ReviewBlock/ReviewBlock"
import { TechBlock } from "../TechBlock/TechBlock"
import { TextBlock } from "../TextBlock/TextBlock"
import { TextEntryBlock } from "../TextEntryBlock/TextEntryBlock"

type BlockReaderProps = {
  block: BlockProps
  isEditable?: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
}

export const BlockReader = ({
  block,
  isEditable = false,
  onDelete,
  handleUpdateInteractions,
}: BlockReaderProps) => {
  switch (block.type) {
    case "text":
      return (
        <div className="flex flex-col px-3 py-3 justify-center min-w-[100%] bg-white  rounded-[20px] lg:rounded-[30px] lg-px[1.125rem]">
          <TextBlock
            block={block}
            isEditable={isEditable}
            onDelete={onDelete}
            handleUpdateInteractions={handleUpdateInteractions}
          />
        </div>
      )
    case "pool":
      return <PoolBlock block={block} isEditable={isEditable} />
    case "image":
      return (
        <ImageBlock
          block={block}
          isEditable={isEditable}
          handleUpdateInteractions={handleUpdateInteractions}
        />
      )
    case "review":
      return (
        <ReviewBlock
          block={block}
          isEditable={isEditable}
          handleUpdateInteractions={handleUpdateInteractions}
        />
      )
    case "textentry":
      return (
        <TextEntryBlock
          block={block}
          isEditable={isEditable}
          handleUpdateInteractions={handleUpdateInteractions}
        />
      )
    case "button":
      return (
        <Button
          block={block}
          isEditable={isEditable}
          handleUpdateInteractions={handleUpdateInteractions}
        />
      )
    case "webhook":
      return <TechBlock block={block} isEditable={isEditable} type="webhook" />
    case "chart":
      return (
        <ChartBlock block={block} isEditable={isEditable} onDelete={onDelete} />
      )
    default:
      return (
        <>
          <h1>um bloco</h1>
        </>
      )
  }
}
