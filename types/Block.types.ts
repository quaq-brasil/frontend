export type IBlock = {
  id?: string
  type?: string
  save_as?: string
}

export type BlockProps = {
  data: any
} & IBlock
