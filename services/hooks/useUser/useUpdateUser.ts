import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IUser } from "./../../../types/User.type"

type useUpdateUserProps = {
  id: string
  data: IUser
} & useMutationProps

export const useUpdateUser = ({ id, data, options }: useUpdateUserProps) => {
  const updateUser = async () => {
    await api.put(`/user/${id}`, { data })
  }

  return useMutation({
    mutationKey: ["updateUser", id],
    mutationFn: updateUser,
    ...options,
  })
}
