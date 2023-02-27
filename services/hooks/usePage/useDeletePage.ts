import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../api"

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
