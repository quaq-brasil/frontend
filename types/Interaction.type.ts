export type IInteraction = {
  id?: string
  blocks: any[]
  data: IInteractionData[]
  events: any[]
  metadata?: any
  last_block_id?: string
  depth?: number
  locations?: any[]
  created_at?: string
  updated_at?: string
  template_id: string
  publication_id: string
  page_id: string
  user_id: string
  Publication?: {
    dependencies?: {
      connected_templates: any
    }
  }
  Template?: {
    id: string
    name: string
    url: string
    shortcut_image: string
  }
  User?: {
    id: string
    avatar_url: string
    name: string
  }
  Page?: {
    id: string
    url: string
    name: string
    avatar_url: string
    background_url: string
  }
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

export type IInteractionAndUser = {
  id?: string
  blocks: any[]
  data: IInteractionData[]
  events: any[]
  metadata?: any
  last_block_id?: string
  depth?: number
  locations?: any[]
  created_at: string
  updated_at: string
  template_id: string
  publication_id: string
  page_id: string
  user_id: string
  User: {
    id: string
    name: string
    email: string
    avatar_url: string
    email_verified: boolean
    type: string
  }
}
