type LocalInteraction = {
  id: string
  updated_at: string
  User: {
    id: string
    avatar_url: string
    name: string
  }
}

export type IPublication = {
  id?: string
  title: string
  blocks: any[]
  template_id?: string
  page_id: string
  published_at?: string
  created_at?: string
  updated_at?: string
  Interaction?: LocalInteraction[]
  dependencies?: any
}

export type IUpdatePublication = {
  id?: string
  title?: string
  blocks?: any[]
  template_id?: string
  page_id?: string
  published_at?: string
  created_at?: string
  updated_at?: string
  Interaction?: LocalInteraction[]
  dependencies?: any
}
