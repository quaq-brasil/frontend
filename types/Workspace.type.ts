import { IPage } from './Page.type'
type IMember = {
  id: string
  user_id: string
  workspace_id: string
  user: {
    id: string
    name: string
    email: string
    avatar_url: string
  }
}

export type IWorkspace = {
  id?: string
  title: string
  slug: string
  avatar_url: string
  services: any[]
  created_at?: string
  updated_at?: string
  members?: IMember[]
  Page?: IPage[]
  user_id?: string
}

export type IUpdateWorkspace = {
  id?: string
  title?: string
  slug?: string
  avatar_url?: string
  services?: any[]
  created_at?: string
  updated_at?: string
  members?: IMember[]
}
