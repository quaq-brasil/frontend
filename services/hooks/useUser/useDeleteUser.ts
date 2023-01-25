import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useDeleteUserProps = {
  id: string
} & useMutationProps

export const useDeleteUser = ({ id, options }: useDeleteUserProps) => {
  const deleteUser = async () => {
    await api.delete(`/user/${id}`)
  }

  return useMutation({
    mutationKey: ["deleteUser", id],
    mutationFn: deleteUser,
    ...options,
  })
}
