import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../api"

type useDeleteUserProps = {
  id: string
} & useMutationProps

export const useDeleteUser = () => {
  const deleteUser = async ({ id }: useDeleteUserProps) => {
    await api.delete(`/users/${id}`)
  }

  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: deleteUser,
  })
}
