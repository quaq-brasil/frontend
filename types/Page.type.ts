import { ITemplate } from "./Template.type"

export type ITrackers = {
  facebook?: string
  google?: string
}

export type IPage = {
  id?: string
  title: string
  slug: string
  description: string
  workspace_id: string
  avatar_url: string
  background_url: string
  services?: any
  trackers: ITrackers
  templates?: ITemplate[]
  visibility?: "public" | "workspace"
}

export type IUpdatePage = {
  id?: string
  title?: string
  slug?: string
  description?: string
  workspace_id?: string
  avatar_url?: string
  background_url?: string
  services?: any
  trackers?: ITrackers
  visibility?: "public" | "workspace"
}
