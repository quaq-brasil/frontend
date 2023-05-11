export type IBlock = {
  id?: string
  type?:
    | "text"
    | "poll"
    | "image"
    | "review"
    | "textentry"
    | "button"
    | "webhook"
    | "chart"
    | "automation"
    | "toggle"
    | "redirect"
    | "embed"
    | "dropdownmenu"
    | "whatsapp"
    | "pdf"
  save_as?: string
}

export type BlockProps = {
  data: any
} & IBlock
