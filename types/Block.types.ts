export type IBlock = {
  id?: string
  type?:
    | "text"
    | "pool"
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
  save_as?: string
}

export type BlockProps = {
  data: any
} & IBlock
