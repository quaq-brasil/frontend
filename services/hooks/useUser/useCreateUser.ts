import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "../../api"
import { IUser } from "./../../../types/User.type"

export const useCreateUser = () => {
  const createUser = async (data: any) => {
    const response: UseMutationResult<IUser> = await api.post(`/users`, data)
    return response.data as IUser
  }

  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: createUser,
  })
}
