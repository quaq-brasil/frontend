import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "../../apiClient"
import { IUser } from "./../../../types/User.type"

export const useCreateUser = () => {
  const createUser = async (data: IUser) => {
    const response: UseMutationResult<IUser> = await api.post(`/users`, data)
    return response.data as IUser
  }

  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: createUser,
  })
}
