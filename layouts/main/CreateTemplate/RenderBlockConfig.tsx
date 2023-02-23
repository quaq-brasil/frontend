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
  handleCheckSaveAs: (value: string | undefined | null) => boolean
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
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
          handleCheckSaveAs={props.handleCheckSaveAs}
        />
      )
    case "text":
      return (
        <TextConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
          handleCheckSaveAs={props.handleCheckSaveAs}
        />
      )
    case "embed":
      return (
        <EmbedConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
          handleCheckSaveAs={props.handleCheckSaveAs}
        />
      )
    case "file":
      return (
        <FileSharingConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
          handleCheckSaveAs={props.handleCheckSaveAs}
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
          handleCheckSaveAs={props.handleCheckSaveAs}
        />
      )
    case "fileentry":
      return (
        <FileSharingConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
          handleCheckSaveAs={props.handleCheckSaveAs}
        />
      )
    case "pool":
      return (
        <PoolConfig
          handleAddBlock={props.handleAddBlock}
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
          handleCheckSaveAs={props.handleCheckSaveAs}
        />
      )
    case "button":
      return (
        <ButtonConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
          handleCheckSaveAs={props.handleCheckSaveAs}
        />
      )
    case "toggle":
      return (
        <ToggleConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
          handleCheckSaveAs={props.handleCheckSaveAs}
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
          handleCheckSaveAs={props.handleCheckSaveAs}
        />
      )
    case "json":
      return (
        <JsonConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
          handleCheckSaveAs={props.handleCheckSaveAs}
        />
      )
    case "counter":
      return (
        <CounterConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
          handleCheckSaveAs={props.handleCheckSaveAs}
        />
      )
    case "automation":
      return (
        <AutomationConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
          handleCheckSaveAs={props.handleCheckSaveAs}
        />
      )
    case "redirect":
      return (
        <RedirectConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
          handleCheckSaveAs={props.handleCheckSaveAs}
        />
      )
    case "webhook":
      return (
        <WebhookConfig
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleAddBlock={props.handleAddBlock}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
          handleCheckSaveAs={props.handleCheckSaveAs}
        />
      )
    case "chart":
      return (
        <ChartConfig
          handleAddBlock={props.handleAddBlock}
          isOpen={props.isOpen}
          onClose={props.onClose}
          handleOpenVariablePanel={props.handleOpenVariablePanel}
          setFunctionHandleAddVariable={props.setFunctionHandleAddVariable}
          handleCheckSaveAs={props.handleCheckSaveAs}
        />
      )
    default:
      return <div></div>
  }
}
