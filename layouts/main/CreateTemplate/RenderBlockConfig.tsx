import { useEffect, useState } from "react"
import { BlockProps } from "../../../types/Block.types"
import { AutomationConfig } from "../../BlocksConfig/AutomationConfig/AutomationConfig"
import { ButtonConfig } from "../../BlocksConfig/ButtonConfig/ButtonConfig"
import ChartConfig from "../../BlocksConfig/ChartConfig/ChartConfig"
import { CounterConfig } from "../../BlocksConfig/CounterConfig/CounterConfig"
import { CreationsConfigPages } from "../../BlocksConfig/CreationsConfig/CreationsConfigPages"
import { EmbedConfig } from "../../BlocksConfig/EmbedConfig/EmbedConfig"
import { FileSharingConfig } from "../../BlocksConfig/FileSharingConfig/FileSharingConfig"
import { ImageConfig } from "../../BlocksConfig/ImageConfig/ImageConfig"
import { JsonConfig } from "../../BlocksConfig/JsonConfig/JsonConfig"
import { PoolConfig } from "../../BlocksConfig/PoolConfig/PoolConfig"
import { RedirectConfig } from "../../BlocksConfig/RedirectConfig/RedirectConfig"
import { ReviewConfig } from "../../BlocksConfig/ReviewConfig/ReviewConfig"
import { TextConfig } from "../../BlocksConfig/TextConfig/TextConfig"
import { TextEntryConfig } from "../../BlocksConfig/TextEntryConfig/TextEntryConfig"
import { ToggleConfig } from "../../BlocksConfig/ToggleConfig/ToggleConfig"
import { WebhookConfig } from "../../BlocksConfig/WebhookConfig/WebhookConfig"

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
