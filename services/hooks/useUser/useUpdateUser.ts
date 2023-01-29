import { useMutation } from "@tanstack/react-query"
import { api } from "../../apiClient"
import { IUpdateUser } from "./../../../types/User.type"

type useUpdateUserProps = {
  id: string
  data: IUpdateUser
}

export const useUpdateUser = () => {
  const updateUser = async ({ id, data }: useUpdateUserProps) => {
    await api.put(`/users/${id}`, data)
  }

  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUser,
  })
}
