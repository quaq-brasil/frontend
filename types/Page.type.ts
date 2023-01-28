export type IPage = {
  id?: string
  name: string
  url: string
  workspace_id: string
  avatar_url: string
  background_url: string
  is_stripe_active?: boolean
  stripe_id?: string
  facebook_pixel_id?: string
  google_analytics_id?: string
}

export type IUpdatePage = {
  name?: string
  url?: string
  workspace_id?: string
  avatar_url?: string
  background_url?: string
  is_stripe_active?: boolean
  stripe_id?: string
  facebook_pixel_id?: string
  google_analytics_id?: string
}
