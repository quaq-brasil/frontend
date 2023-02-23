import { IPage } from "./Page.type"

type IMember = {
  user_id: string
  email: string
  name: string
  avatar_url: string
  roles: string[]
}

export type IWorkspace = {
  id?: string
  title: string
  avatar_url: string
  slug: string
  members?: IMember[]
  user_id?: string
  services: [
    {
      type: string
      description: string
    }
  ]
  Page?: IPage[]
}

export type IUpdateWorkspace = {
  id?: string
  title?: string
  slug?: string
  avatar_url?: string
  user_id?: string
  members?: IMember[]
  services?: [
    {
      type?: string
      description?: string
    }
  ]
}
