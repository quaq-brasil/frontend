export type IVariableRequest = {
  creator_id: string
  blocks: any[]
  template_id?: string
  connected_templates?: string[]
}

export type IVariableResponse = {
  consumer: {
    id: string
    name: string
    email: string
    profile_picture: string
    registration_status: string
  }
  events: any
  blocks: any
  publications: any[]
  creator: {
    id: string
    name: string
    email: string
    profile_picture: string
  }
  connected_templates: any
}
