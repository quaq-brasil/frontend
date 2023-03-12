import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IUpdateUser } from "types/User.type"

type useUpdateUserProps = {
  id: string
  data: IUpdateUser
}

export const useUpdateUser = () => {
  const updateUser = async ({ id, data }: useUpdateUserProps) => {
    const response: UseMutationResult<IUpdateUser> = await api.put(
      `/users/${id}`,
      data
    )
    return response.data as IUpdateUser
  }

  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUser,
  })
}
