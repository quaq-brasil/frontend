import { AutomationBlock } from "components/AutomationBlock/AutomationBlock"
import { Button } from "components/Button/Button"
import { ChartBlock } from "components/ChartBlock/ChartBlock"
import { ImageBlock } from "components/ImageBlock/ImageBlock"
import { PoolBlock } from "components/PoolBlock/PoolBlock"
import { ReviewBlock } from "components/ReviewBlock/ReviewBlock"
import { TextBlock } from "components/TextBlock/TextBlock"
import { TextEntryBlock } from "components/TextEntryBlock/TextEntryBlock"
import { ToggleBlock } from "components/ToggleBlock/ToggleBlock"
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

const blockComponents = {
  text: TextBlock,
  pool: PoolBlock,
  image: ImageBlock,
  review: ReviewBlock,
  textentry: TextEntryBlock,
  button: Button,
  webhook: WebhookBlock,
  chart: ChartBlock,
  automation: AutomationBlock,
  toggle: ToggleBlock,
}

type BlockWrapperProps = {
  Component: any
  block: BlockProps
  isEditable: boolean
  onDelete: () => void
  handleUpdateInteractions: (interaction: IInteractionData) => void
  onEdit: () => void
}

const BlockWrapper = ({
  Component,
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: BlockWrapperProps) => (
  <Component
    block={block}
    isEditable={isEditable}
    onDelete={onDelete}
    onEdit={onEdit}
    handleUpdateInteractions={handleUpdateInteractions}
  />
)

export const BlockReader = ({
  block,
  isEditable = false,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: BlockReaderProps) => {
  const Component = blockComponents[block.type]

  return Component ? (
    <BlockWrapper
      Component={Component}
      block={block}
      isEditable={isEditable}
      onDelete={onDelete}
      handleUpdateInteractions={handleUpdateInteractions}
      onEdit={onEdit}
    />
  ) : (
    <h1>error: missing block</h1>
  )
}
