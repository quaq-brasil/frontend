import { useMutation } from "@tanstack/react-query"
import { loginProps, loginResponseProps } from "../../../types/Auth.types"
import { appSetCookies } from "../../../utils/cookies"
import { api } from "../../api"

export const useLogin = () => {
  const login = async (data: loginProps) => {
    const response = await api.post("/auth/login", data, {
      headers: {
        accept: "application/json",
      },
    })

    return response.data as loginResponseProps
  }

  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess(data) {
      appSetCookies("token", data.token)
    },
  })
}
