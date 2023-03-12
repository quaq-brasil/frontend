import { useMutation } from "@tanstack/react-query"
import { api } from "services/api"
import { useMutationProps } from "types/useQueryProps"

type useDeletePageProps = {
  id: string
} & useMutationProps

export const useDeletePage = () => {
  const deletePage = async ({ id }: useDeletePageProps) => {
    await api.delete(`/pages/${id}`)
  }

  return useMutation({
    mutationKey: ["deletePage"],
    mutationFn: deletePage,
  })
}
