export type IInteraction = {
  id?: string
  blocks: any[]
  data: IInteractionData[]
  events: any[]
  metadata?: any
  last_block_id?: string
  depth?: number
  locations?: any[]
  template_id: string
  publication_id: string
  page_id: string
  user_id: string
}

export type IInteractionData = {
  id: string
  config: {
    id: string
    type: string
    save_as: string
    data: any
  }
  output: {
    data?: any
    events: any
  }
}
