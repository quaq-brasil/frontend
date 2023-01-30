export type ITrackers = {
  facebook?: string
  google?: string
}

export type ITemplate = {
  id?: string
  name: string
  url: string
  shortcut_image: string
  shortcut_size: "small" | "large"
  current_publication_id: string
  number_of_new_interactions: number
  facebook_pixel_id?: string
  google_analytics_id?: string
  trackers: ITrackers
  page_id: string
}

export type IUpdateTemplate = {
  id?: string
  name?: string
  url?: string
  shortcut_image?: string
  shortcut_size?: "small" | "large"
  current_publication_id?: string
  number_of_new_interactions?: number
  facebook_pixel_id?: string
  google_analytics_id?: string
  trackers?: ITrackers
  page_id?: string
}
