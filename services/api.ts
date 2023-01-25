import axios from "axios"

export function setupAPIClient(ctx?: any) {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    headers: {
      "Content-Type": "application/json",
    },
  })

  return api
}
