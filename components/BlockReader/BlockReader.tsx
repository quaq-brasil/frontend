import { BlockProps } from "../../types/Block.types"
import { IInteractionData } from "../../types/Interaction.type"
import { Button } from "../Button/Button"
import { ChartBlock } from "../ChartBlock/ChartBlock"
import { ImageBlock } from "../ImageBlock/ImageBlock"
import { PoolBlock } from "../PoolBlock/PoolBlock"
import { ReviewBlock } from "../ReviewBlock/ReviewBlock"
import { TextBlock } from "../TextBlock/TextBlock"
import { TextEntryBlock } from "../TextEntryBlock/TextEntryBlock"
import { WebhookBlock } from "../WebhookBlock/WebhookBlock"

type BlockReaderProps = {
  block: BlockProps
  isEditable?: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

export const BlockReader = ({
  block,
  isEditable = false,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: BlockReaderProps) => {
  switch (block.type) {
    case "text":
      return (
        <TextBlock
          block={block}
          isEditable={isEditable}
          onDelete={onDelete}
          onEdit={onEdit}
          handleUpdateInteractions={handleUpdateInteractions}
        />
      )
    case "pool":
      return (
        <PoolBlock
          block={block}
          isEditable={isEditable}
          onDelete={onDelete}
          handleUpdateInteractions={handleUpdateInteractions}
        />
      )
    case "image":
      return (
        <ImageBlock
          block={block}
          isEditable={isEditable}
          onDelete={onDelete}
          handleUpdateInteractions={handleUpdateInteractions}
        />
      )
    case "review":
      return (
        <ReviewBlock
          block={block}
          isEditable={isEditable}
          onDelete={onDelete}
          handleUpdateInteractions={handleUpdateInteractions}
        />
      )
    case "textentry":
      return (
        <TextEntryBlock
          block={block}
          isEditable={isEditable}
          onDelete={onDelete}
          handleUpdateInteractions={handleUpdateInteractions}
        />
      )
    case "button":
      return (
        <Button
          block={block}
          isEditable={isEditable}
          onDelete={onDelete}
          handleUpdateInteractions={handleUpdateInteractions}
        />
      )
    case "webhook":
      return (
        <WebhookBlock
          block={block}
          isEditable={isEditable}
          onDelete={onDelete}
        />
      )
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
