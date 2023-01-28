export type IWorkspace = {
  name: string
  avatar_url: string
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
  services?: [
    {
      name?: string
      description?: string
    }
  ]
}
