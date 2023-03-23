import dynamic from "next/dynamic"
import { memo } from "react"
import { BlockProps } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const EmbedBlock = dynamic(
  () =>
    import("components/EmbedBlock/EmbedBlock").then((mod) => mod.EmbedBlock),
  {
    ssr: true,
  }
)

const AutomationBlock = dynamic(
  () =>
    import("components/AutomationBlock/AutomationBlock").then(
      (mod) => mod.AutomationBlock
    ),
  {
    ssr: true,
  }
)

const Button = dynamic(
  () => import("components/Button/Button").then((mod) => mod.Button),
  {
    ssr: true,
  }
)

const ChartBlock = dynamic(
  () =>
    import("components/ChartBlock/ChartBlock").then((mod) => mod.ChartBlock),
  {
    ssr: true,
  }
)

const ImageBlock = dynamic(
  () =>
    import("components/ImageBlock/ImageBlock").then((mod) => mod.ImageBlock),
  {
    ssr: true,
  }
)

const PoolBlock = dynamic(
  () => import("components/PoolBlock/PoolBlock").then((mod) => mod.PoolBlock),
  {
    ssr: true,
  }
)

const RedirectBlock = dynamic(
  () =>
    import("components/RedirectBlock/RedirectBlock").then(
      (mod) => mod.RedirectBlock
    ),
  {
    ssr: true,
  }
)

const ReviewBlock = dynamic(
  () =>
    import("components/ReviewBlock/ReviewBlock").then((mod) => mod.ReviewBlock),
  {
    ssr: true,
  }
)

const TextBlock = dynamic(
  () => import("components/TextBlock/TextBlock").then((mod) => mod.TextBlock),
  {
    ssr: true,
  }
)

const TextEntryBlock = dynamic(
  () =>
    import("components/TextEntryBlock/TextEntryBlock").then(
      (mod) => mod.TextEntryBlock
    ),
  {
    ssr: true,
  }
)

const ToggleBlock = dynamic(
  () =>
    import("components/ToggleBlock/ToggleBlock").then((mod) => mod.ToggleBlock),
  {
    ssr: true,
  }
)

const WebhookBlock = dynamic(
  () =>
    import("components/WebhookBlock/WebhookBlock").then(
      (mod) => mod.WebhookBlock
    ),
  {
    ssr: true,
  }
)

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
  redirect: RedirectBlock,
  embed: EmbedBlock,
}

type BlockWrapperProps = {
  Component: any
  block: BlockProps
  isEditable: boolean
  onDelete: () => void
  handleUpdateInteractions: (interaction: IInteractionData) => void
  onEdit: () => void
}

export const BlockWrapper = memo(function BlockWrapper({
  Component,
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: BlockWrapperProps) {
  return (
    <Component
      block={block}
      isEditable={isEditable}
      onDelete={onDelete}
      onEdit={onEdit}
      handleUpdateInteractions={handleUpdateInteractions}
    />
  )
})

export const BlockReader = memo(function BlockReader({
  block,
  isEditable = false,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: BlockReaderProps) {
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
})
