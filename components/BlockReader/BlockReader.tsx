import dynamic from "next/dynamic"
import { BlockProps } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const TextBlock = dynamic(() =>
  import("components/TextBlock/TextBlock").then((mod) => mod.TextBlock)
)

const PoolBlock = dynamic(() =>
  import("components/PoolBlock/PoolBlock").then((mod) => mod.PoolBlock)
)

const ImageBlock = dynamic(() =>
  import("components/ImageBlock/ImageBlock").then((mod) => mod.ImageBlock)
)

const ReviewBlock = dynamic(() =>
  import("components/ReviewBlock/ReviewBlock").then((mod) => mod.ReviewBlock)
)

const TextEntryBlock = dynamic(() =>
  import("components/TextEntryBlock/TextEntryBlock").then(
    (mod) => mod.TextEntryBlock
  )
)

const Button = dynamic(() =>
  import("components/Button/Button").then((mod) => mod.Button)
)

const WebhookBlock = dynamic(() =>
  import("components/WebhookBlock/WebhookBlock").then((mod) => mod.WebhookBlock)
)

const ChartBlock = dynamic(() =>
  import("components/ChartBlock/ChartBlock").then((mod) => mod.ChartBlock)
)

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
