import dynamic from "next/dynamic"
import { memo } from "react"
import { BlockProps } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const PDFBlock = dynamic(
  () => import("components/PDFBlock/PDFBlock").then((mod) => mod.default),
  {
    ssr: true,
  }
)

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

const ImageBlockVideo = dynamic(
  () =>
    import("components/ImageBlock/ImageBlockVideo").then(
      (mod) => mod.ImageBlockVideo
    ),
  {
    ssr: true,
  }
)

const PollBlock = dynamic(
  () => import("components/PollBlock/PollBlock").then((mod) => mod.PollBlock),
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
  handleAddBlock?: (newBlock: BlockProps) => void
}

const blockComponents = {
  text: TextBlock,
  poll: PollBlock,
  pool: PollBlock,
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
  imagevideo: ImageBlockVideo,
  pdf: PDFBlock,
}

type BlockWrapperProps = {
  Component: any
  block: BlockProps
  isEditable: boolean
  onDelete: () => void
  handleUpdateInteractions: (interaction: IInteractionData) => void
  onEdit: () => void
  handleAddBlock?: (newBlock: BlockProps) => void
}

export const BlockWrapper = memo(function BlockWrapper({
  Component,
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
  handleAddBlock,
}: BlockWrapperProps) {
  return (
    <Component
      block={block}
      isEditable={isEditable}
      onDelete={onDelete}
      onEdit={onEdit}
      handleUpdateInteractions={handleUpdateInteractions}
      handleAddBlock={handleAddBlock}
    />
  )
})

export const BlockReader = memo(function BlockReader({
  block,
  isEditable = false,
  onDelete,
  handleUpdateInteractions,
  onEdit,
  handleAddBlock,
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
      handleAddBlock={handleAddBlock}
    />
  ) : (
    <h1>error: missing block</h1>
  )
})
