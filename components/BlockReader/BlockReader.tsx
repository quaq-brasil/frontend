import { Button } from "components/Button/Button"
import { ChartBlock } from "components/ChartBlock/ChartBlock"
import { ImageBlock } from "components/ImageBlock/ImageBlock"
import { PoolBlock } from "components/PoolBlock/PoolBlock"
import { ReviewBlock } from "components/ReviewBlock/ReviewBlock"
import { TextBlock } from "components/TextBlock/TextBlock"
import { TextEntryBlock } from "components/TextEntryBlock/TextEntryBlock"
import { WebhookBlock } from "components/WebhookBlock/WebhookBlock"
import { BlockProps } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

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
          onEdit={onEdit}
        />
      )
    case "image":
      return (
        <ImageBlock
          block={block}
          isEditable={isEditable}
          onDelete={onDelete}
          handleUpdateInteractions={handleUpdateInteractions}
          onEdit={onEdit}
        />
      )
    case "review":
      return (
        <ReviewBlock
          block={block}
          isEditable={isEditable}
          onDelete={onDelete}
          handleUpdateInteractions={handleUpdateInteractions}
          onEdit={onEdit}
        />
      )
    case "textentry":
      return (
        <TextEntryBlock
          block={block}
          isEditable={isEditable}
          onDelete={onDelete}
          handleUpdateInteractions={handleUpdateInteractions}
          onEdit={onEdit}
        />
      )
    case "button":
      return (
        <Button
          block={block}
          isEditable={isEditable}
          onDelete={onDelete}
          handleUpdateInteractions={handleUpdateInteractions}
          onEdit={onEdit}
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
        <ChartBlock
          block={block}
          isEditable={isEditable}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )
    default:
      return (
        <>
          <h1>error: missing block</h1>
        </>
      )
  }
}
