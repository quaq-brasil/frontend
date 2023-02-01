import { BlockProps } from "../../../components/BlockReader/BlockReader"
import { AutomationConfig } from "../../BlocksConfig/AutomationConfig/AutomationConfig"
import { ButtonConfig } from "../../BlocksConfig/ButtonConfig/ButtonConfig"
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

type RenderBlockConfig = {
  block: string | undefined
  isOpen: boolean
  onClose: () => void
  handleAddBlock: (block: BlockProps) => void
}

export function RenderBlockConfig(props: RenderBlockConfig) {
  switch (props.block) {
    case "creations":
      return (
        <CreationsConfigPages isOpen={props.isOpen} setIsOpen={props.onClose} />
      )
    case "image":
      return <ImageConfig isOpen={props.isOpen} setIsOpen={props.onClose} />
    case "text":
      return (
        <TextConfig
          isOpen={props.isOpen}
          setIsOpen={props.onClose}
          handleAddBlock={props.handleAddBlock}
        />
      )
    case "embed":
      return <EmbedConfig isOpen={props.isOpen} setIsOpen={props.onClose} />
    case "file":
      return (
        <FileSharingConfig isOpen={props.isOpen} setIsOpen={props.onClose} />
      )
    case "textentry":
      return (
        <TextEntryConfig
          isOpen={props.isOpen}
          setIsOpen={props.onClose}
          handleAddBlock={props.handleAddBlock}
        />
      )
    case "fileentry":
      return (
        <FileSharingConfig isOpen={props.isOpen} setIsOpen={props.onClose} />
      )
    case "pool":
      return (
        <PoolConfig
          handleAddBlock={props.handleAddBlock}
          isOpen={props.isOpen}
          setIsOpen={props.onClose}
        />
      )
    case "button":
      return <ButtonConfig isOpen={props.isOpen} setIsOpen={props.onClose} />
    case "toggle":
      return <ToggleConfig isOpen={props.isOpen} setIsOpen={props.onClose} />
    case "review":
      return <ReviewConfig isOpen={props.isOpen} setIsOpen={props.onClose} />
    case "json":
      return <JsonConfig isOpen={props.isOpen} setIsOpen={props.onClose} />
    case "counter":
      return <CounterConfig isOpen={props.isOpen} setIsOpen={props.onClose} />
    case "automation":
      return (
        <AutomationConfig isOpen={props.isOpen} setIsOpen={props.onClose} />
      )
    case "redirect":
      return <RedirectConfig isOpen={props.isOpen} setIsOpen={props.onClose} />
    default:
      return <div></div>
  }
}
