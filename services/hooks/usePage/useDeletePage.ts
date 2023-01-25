import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useDeletePageProps = {
  id: string
} & useMutationProps

export const useDeletePage = ({ id, options }: useDeletePageProps) => {
  const deletePage = async () => {
    await api.delete(`/page/${id}`)
  }

  return useMutation({
    mutationKey: ["deletePage", id],
    mutationFn: deletePage,
    ...options,
  })
}
