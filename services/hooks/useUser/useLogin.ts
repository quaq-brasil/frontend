import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "services/api"
import { useMutationProps } from "types/useQueryProps"
import { appSetCookies } from "utils/cookies"

type LoginProps = {
  token: string
}

type useLoginProps = {
  email: string
  password: string
} & useMutationProps

export const useLogin = () => {
  const loginUser = async ({ email, password }: useLoginProps) => {
    const response: UseMutationResult<LoginProps> = await api.post(
      `/auth/login`,
      {
        email,
        password,
      }
    )
    return response.data as LoginProps
  }

  return useMutation({
    mutationKey: ["loginUser"],
    mutationFn: loginUser,
    onSuccess: (data) => {
      appSetCookies("token", data.token)
    },
  })
}
