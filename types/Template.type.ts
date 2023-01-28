export type ITemplate = {
  name: string
  url: string
  shortcut_image: string
  shortcut_size: string
  current_publication_id: string
  number_of_new_interactions: number
  facebook_pixel_id?: string
  google_analytics_id?: string
  page_id: string
}

export type IUpateTemplate = {
  name?: string
  url?: string
  shortcut_image?: string
  shortcut_size?: string
  current_publication_id?: string
  number_of_new_interactions?: number
  facebook_pixel_id?: string
  google_analytics_id?: string
  page_id?: string
}
