import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useDeleteUserProps = {
  id: string
} & useMutationProps

export const useDeleteUser = ({ id }: useDeleteUserProps) => {
  const deleteUser = async () => {
    await api.delete(`/users/${id}`)
  }

  return useMutation({
    mutationKey: ["deleteUser", id],
    mutationFn: deleteUser,
  })
}
