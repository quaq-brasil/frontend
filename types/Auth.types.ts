export type loginProps = {
  email: string
  password: string
}

export type loginResponseProps = {
  token: string
}

export type IUserPayload = {
  sub: string
  email: string
  name: string
  avatar_url: string
}
