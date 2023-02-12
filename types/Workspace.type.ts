import { IPage } from "./Page.type"
export type IWorkspace = {
  id?: string
  name: string
  avatar_url: string
  slug: string
  members?: {
    user_id: string
    email: string
    name: string
    avatar_url: string
    roles: string[]
  }
  user_id?: string
  services: [
    {
      name: string
      description: string
    }
  ]
  Page?: IPage[]
}

export type IUpdateWorkspace = {
  id?: string
  name?: string
  slug?: string
  avatar_url?: string
  user_id?: string
  members?: {
    user_id: string
    email: string
    name: string
    avatar_url: string
    roles: string[]
  }
  services?: [
    {
      name?: string
      description?: string
    }
  ]
}
