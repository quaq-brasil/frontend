export type IWorkspace = {
  id?: string
  name: string
  avatar_url: string
  user_id: string
  services: [
    {
      name: string
      description: string
    }
  ]
}

export type IUpdateWorkspace = {
  id?: string
  name?: string
  avatar_url?: string
  user_id?: string
  services?: [
    {
      name?: string
      description?: string
    }
  ]
}
