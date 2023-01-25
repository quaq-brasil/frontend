import { useMutation } from "@tanstack/react-query"
import { api } from "../../apiClient"
import { IUser } from "./../../../types/User.type"

export const useCreateUser = () => {
  const createUser = async (data: IUser) => {
    await api.post(`/user`, data)
  }

  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: createUser,
  })
}
