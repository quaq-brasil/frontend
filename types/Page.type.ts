import { ITemplate } from "./Template.type"

export type ITrackers = {
  facebook?: string
  google?: string
}

export type IPage = {
  id?: string
  name: string
  url: string
  description: string
  workspace_id: string
  avatar_url: string
  background_url: string
  is_stripe_active: boolean
  stripe_id: string
  trackers: ITrackers
  templates?: ITemplate[]
}

export type IUpdatePage = {
  id?: string
  name?: string
  url?: string
  description?: string
  workspace_id?: string
  avatar_url?: string
  background_url?: string
  is_stripe_active?: boolean
  stripe_id?: string
  trackers?: ITrackers
}
