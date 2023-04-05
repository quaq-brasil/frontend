export type IUser = {
  id: string
  email: string
  password: string
  type: string
  email_verified: boolean
  password_reset_token_attempts: number
  name: string
  avatar_url: string
  services: any[]
  confirmation_token: string
  last_login: string
  created_at: string
  updated_at: string
  token?: string
  refresh_token?: string
}

export type IUpdateUser = {
  id?: string
  email?: string
  password?: string
  type?: string
  email_verified?: boolean
  password_reset_token_attempts?: number
  name?: string
  avatar_url?: string
  services?: any[]
  confirmation_token?: string
  last_login?: string
  created_at?: string
  updated_at?: string
}

export type IUserLogin = {
  email?: string
  password?: string
}
