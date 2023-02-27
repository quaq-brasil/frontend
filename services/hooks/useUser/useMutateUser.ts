import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../api"
import { IUser } from "./../../../types/User.type"

type useMutateUserProps = {
  id: string
} & useMutationProps

export const useMutateUser = () => {
  const getUser = async ({ id }: useMutateUserProps) => {
    const response: UseMutationResult<IUser> = await api.put(`/users/${id}`, {})
    return response.data as IUser
  }

  return useMutation({
    mutationKey: ["getUser"],
    mutationFn: getUser,
  })
}
