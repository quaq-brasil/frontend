export type IWorkspace = {
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
