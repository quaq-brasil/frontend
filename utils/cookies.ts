import * as cookie from "cookie"
import { parseCookies, setCookie } from "nookies"

export function appParseCookies(req: any) {
  if (!req || !req.headers) {
    return {}
  }

  return cookie.parse(req.headers?.cookie || "")
}

export function appSetCookies(
  key: string,
  value: string | object,
  options?: cookie.CookieSerializeOptions
) {
  if (typeof value !== "string") {
    value = JSON.stringify(value)
  }

  setCookie(null, key, value, {
    ...options,
    secure: process.env.NODE_ENV === "production" ? true : false,
  })
}

export function appGetCookie(key: string) {
  const cookies = parseCookies()

  if (!cookies[key]) {
    return null
  }

  return cookies[key]
}
