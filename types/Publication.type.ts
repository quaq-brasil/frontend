export type IPublication = {
  id?: string
  title: string
  blocks: any[]
  template_id?: string
  page_id: string
  published_at?: string
  dependencies?: any
}

export type IUpdatePublication = {
  id?: string
  title?: string
  blocks?: any[]
  template_id?: string
  page_id?: string
  published_at?: string
  dependencies?: any
}
