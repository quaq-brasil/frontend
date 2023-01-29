import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IUser } from "./../../../types/User.type"

type useLoginProps = {
  email: string
  password: string
} & useMutationProps

export const useLogin = () => {
  const loginUser = async ({ email, password }: useLoginProps) => {
    const response: UseMutationResult<IUser> = await api.post(`/auth/login`, {
      email,
      password,
    })
    return response.data as IUser
  }

  return useMutation({
    mutationKey: ["loginUser"],
    mutationFn: loginUser,
  })
}
