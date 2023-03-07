import axios from "axios"
import { appGetCookie } from "../utils/cookies"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((request) => {
  if (!process?.browser) {
    return request
  }

  
  const token = appGetCookie("token")
  
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`
  }

  return request
})
