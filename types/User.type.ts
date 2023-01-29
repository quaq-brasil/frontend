export type IUser = {
  email: string
  password: string
  type: string
  email_verified: boolean
  password_reset_token_attempts: number
  name: string
  avatar_url: string
  stripe_customer_id: string
  email_activation_token: string
  password_reset_token: string
  email_activation_token_expires: Date
  password_reset_token_expires: Date
  last_login: Date
  workspace_id: string
}

export type IUpdateUser = {
  email?: string
  password?: string
  type?: string
  email_verified?: boolean
  password_reset_token_attempts?: number
  name?: string
  avatar_url?: string
  stripe_customer_id?: string
  email_activation_token?: string
  password_reset_token?: string
  email_activation_token_expires?: Date
  password_reset_token_expires?: Date
  last_login?: Date
  workspace_id?: string
}
