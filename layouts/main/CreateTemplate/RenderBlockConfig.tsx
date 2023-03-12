import { AutomationConfig } from "layouts/BlocksConfig/AutomationConfig/AutomationConfig"
import { ButtonConfig } from "layouts/BlocksConfig/ButtonConfig/ButtonConfig"
import ChartConfig from "layouts/BlocksConfig/ChartConfig/ChartConfig"
import { CounterConfig } from "layouts/BlocksConfig/CounterConfig/CounterConfig"
import { CreationsConfigPages } from "layouts/BlocksConfig/CreationsConfig/CreationsConfigPages"
import { EmbedConfig } from "layouts/BlocksConfig/EmbedConfig/EmbedConfig"
import { FileSharingConfig } from "layouts/BlocksConfig/FileSharingConfig/FileSharingConfig"
import { ImageConfig } from "layouts/BlocksConfig/ImageConfig/ImageConfig"
import { JsonConfig } from "layouts/BlocksConfig/JsonConfig/JsonConfig"
import { PoolConfig } from "layouts/BlocksConfig/PoolConfig/PoolConfig"
import { RedirectConfig } from "layouts/BlocksConfig/RedirectConfig/RedirectConfig"
import { ReviewConfig } from "layouts/BlocksConfig/ReviewConfig/ReviewConfig"
import { TextConfig } from "layouts/BlocksConfig/TextConfig/TextConfig"
import { TextEntryConfig } from "layouts/BlocksConfig/TextEntryConfig/TextEntryConfig"
import { ToggleConfig } from "layouts/BlocksConfig/ToggleConfig/ToggleConfig"
import { WebhookConfig } from "layouts/BlocksConfig/WebhookConfig/WebhookConfig"
import { useEffect, useState } from "react"
import { BlockProps } from "types/Block.types"

type RenderBlockConfig = {
  block: string
  isOpen: boolean
  onClose: () => void
  handleAddBlock: (block: BlockProps) => void
  handleOpenVariablePanel: () => void
  setFunctionHandleAddVariable: (variable: any) => void
  handleCheckSaveAs: (value: string | undefined | null) => boolean
  blockData?: BlockProps | null
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
  pool: {
    component: PoolConfig,
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
  chart: {
    component: ChartConfig,
  },
  redirect: {
    component: RedirectConfig,
  },
  webhook: {
    component: WebhookConfig,
  },
}

export function RenderBlockConfig(props: RenderBlockConfig) {
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
      />
    )
  } else {
    return null
  }
}
