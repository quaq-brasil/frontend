import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useLoginProps = {
  email: string
  password: string
} & useMutationProps

export const useLogin = () => {
  const loginUser = async ({ email, password }: useLoginProps) => {
    await api.post(`/user/login`, { email, password })
  }

  return useMutation({
    mutationKey: ["loginUser"],
    mutationFn: loginUser,
  })
}
