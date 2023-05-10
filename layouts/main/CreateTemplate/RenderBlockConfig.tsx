import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { BlockProps } from "types/Block.types"

const WebhookConfig = dynamic(() =>
  import("layouts/BlocksConfig/WebhookConfig/WebhookConfig").then(
    (mod) => mod.WebhookConfig
  )
)

const WhatsAppBlock = dynamic(() =>
  import("layouts/BlocksConfig/WhatsAppConfig/WhatsAppConfig").then(
    (mod) => mod.WhatsAppConfig
  )
)

const DropDownMenuConfig = dynamic(() =>
  import("layouts/BlocksConfig/DropDownMenuConfig/DropDownMenuConfig").then(
    (mod) => mod.DropDownMenuConfig
  )
)

const ToggleConfig = dynamic(() =>
  import("layouts/BlocksConfig/ToggleConfig/ToggleConfig").then(
    (mod) => mod.ToggleConfig
  )
)

const TextEntryConfig = dynamic(() =>
  import("layouts/BlocksConfig/TextEntryConfig/TextEntryConfig").then(
    (mod) => mod.TextEntryConfig
  )
)

const TextConfig = dynamic(() =>
  import("layouts/BlocksConfig/TextConfig/TextConfig").then(
    (mod) => mod.TextConfig
  )
)

const ReviewConfig = dynamic(() =>
  import("layouts/BlocksConfig/ReviewConfig/ReviewConfig").then(
    (mod) => mod.ReviewConfig
  )
)

const RedirectConfig = dynamic(() =>
  import("layouts/BlocksConfig/RedirectConfig/RedirectConfig").then(
    (mod) => mod.RedirectConfig
  )
)

const PollConfig = dynamic(() =>
  import("layouts/BlocksConfig/PollConfig/PollConfig").then(
    (mod) => mod.PollConfig
  )
)

const JsonConfig = dynamic(() =>
  import("layouts/BlocksConfig/JsonConfig/JsonConfig").then(
    (mod) => mod.JsonConfig
  )
)

const ImageConfig = dynamic(() =>
  import("layouts/BlocksConfig/ImageConfig/ImageConfig").then(
    (mod) => mod.ImageConfig
  )
)

const FileSharingConfig = dynamic(() =>
  import("layouts/BlocksConfig/FileSharingConfig/FileSharingConfig").then(
    (mod) => mod.FileSharingConfig
  )
)

const EmbedConfig = dynamic(() =>
  import("layouts/BlocksConfig/EmbedConfig/EmbedConfig").then(
    (mod) => mod.EmbedConfig
  )
)

const CreationsConfigPages = dynamic(() =>
  import("layouts/BlocksConfig/CreationsConfig/CreationsConfigPages").then(
    (mod) => mod.CreationsConfigPages
  )
)

const CounterConfig = dynamic(() =>
  import("layouts/BlocksConfig/CounterConfig/CounterConfig").then(
    (mod) => mod.CounterConfig
  )
)

const ChartConfig = dynamic(() =>
  import("layouts/BlocksConfig/ChartConfig/ChartConfig").then(
    (mod) => mod.ChartConfig
  )
)

const ButtonConfig = dynamic(() =>
  import("layouts/BlocksConfig/ButtonConfig/ButtonConfig").then(
    (mod) => mod.ButtonConfig
  )
)

const AutomationConfig = dynamic(() =>
  import("layouts/BlocksConfig/AutomationConfig/AutomationConfig").then(
    (mod) => mod.AutomationConfig
  )
)

type RenderBlockConfigProps = {
  block: string
  isOpen: boolean
  onClose: () => void
  handleAddBlock: (block: BlockProps) => void
  handleOpenVariablePanel: () => void
  setFunctionHandleAddVariable: (variable: any) => void
  handleCheckSaveAs: (value: string | undefined | null) => boolean
  blockData?: BlockProps | null
  blocks?: BlockProps[]
}

type BlockConfigurations = {
  [key: string]: {
    component: React.ComponentType<any>
  }
}

const blockConfigurations: BlockConfigurations = {
  creations: {
    component: CreationsConfigPages,
  },
  image: {
    component: ImageConfig,
  },
  text: {
    component: TextConfig,
  },
  embed: {
    component: EmbedConfig,
  },
  file: {
    component: FileSharingConfig,
  },
  textentry: {
    component: TextEntryConfig,
  },
  fileentry: {
    component: FileSharingConfig,
  },
  poll: {
    component: PollConfig,
  },
  button: {
    component: ButtonConfig,
  },
  toggle: {
    component: ToggleConfig,
  },
  review: {
    component: ReviewConfig,
  },
  json: {
    component: JsonConfig,
  },
  counter: {
    component: CounterConfig,
  },
  automation: {
    component: AutomationConfig,
  },
  redirect: {
    component: RedirectConfig,
  },
  webhook: {
    component: WebhookConfig,
  },
  dropdownmenu: {
    component: DropDownMenuConfig,
  },
  whatsapp: {
    component: WhatsAppBlock,
  },
}

export function RenderBlockConfig(props: RenderBlockConfigProps) {
  const [data, setData] = useState(props)

  useEffect(() => {
    setData(props)
  }, [props])

  const BlockComponent = blockConfigurations[props.block]?.component

  if (BlockComponent) {
    return (
      <BlockComponent
        isOpen={data.isOpen}
        onClose={data.onClose}
        handleAddBlock={data.handleAddBlock}
        handleOpenVariablePanel={data.handleOpenVariablePanel}
        setFunctionHandleAddVariable={data.setFunctionHandleAddVariable}
        handleCheckSaveAs={data.handleCheckSaveAs}
        blockData={data.blockData || null}
        blocks={data.blocks}
      />
    )
  } else {
    return null
  }
}
