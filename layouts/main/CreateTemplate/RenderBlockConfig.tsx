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
  block: string | undefined
  isOpen: boolean
  onClose: () => void
  handleAddBlock: (block: BlockProps) => void
  handleOpenVariablePanel: () => void
  setFunctionHandleAddVariable: (variable: any) => void
}

export function RenderBlockConfig(props: RenderBlockConfig) {
  switch (props.block) {
    case "creations":
      return (
        <CreationsConfigPages isOpen={props.isOpen} onClose={props.onClose} />
      )
    case "image":
      return (
        <ImageConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
        />
      )
    case "text":
      return (
        <TextConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
        />
      )
    case "embed":
      return (
        <EmbedConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
        />
      )
    case "file":
      return (
        <FileSharingConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
        />
      )
    case "textentry":
      return (
        <TextEntryConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
        />
      )
    case "fileentry":
      return (
        <FileSharingConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
        />
      )
    case "pool":
      return (
        <PoolConfig
          handleAddBlock={props.handleAddBlock}
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
        />
      )
    case "button":
      return (
        <ButtonConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
        />
      )
    case "toggle":
      return (
        <ToggleConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
        />
      )
    case "review":
      return (
        <ReviewConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
        />
      )
    case "json":
      return (
        <JsonConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
        />
      )
    case "counter":
      return (
        <CounterConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
        />
      )
    case "automation":
      return (
        <AutomationConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
        />
      )
    case "redirect":
      return (
        <RedirectConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
        />
      )
    case "webhook":
      return (
        <WebhookConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
        />
      )
    case "chart":
      return (
        <ChartConfig
          handleAddBlock={props.handleAddBlock}
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
        />
      )
    default:
      return <div></div>
  }
}
