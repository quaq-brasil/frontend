export type IPublication = {
  id?: string
  title: string
  blocks: object
  template_id: string
  page_id: string
  published_at?: string
}

export type IUpdatePublication = {
  id?: string
  title?: string
  blocks?: object
  template_id?: string
  page_id?: string
  published_at?: string
}
