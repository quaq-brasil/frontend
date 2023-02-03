export type IBlock = {
  id?: string
  type?: string
  saveAs?: string
}

export type BlockProps = {
  data: any
} & IBlock
