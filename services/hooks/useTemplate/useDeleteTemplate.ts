import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useDeleteTemplateProps = {
  id: string
} & useMutationProps

export const useDeleteTemplate = () => {
  const deleteTemplate = async ({ id }: useDeleteTemplateProps) => {
    await api.delete(`/templates/${id}`)
  }

  return useMutation({
    mutationKey: ["deleteTemplate"],
    mutationFn: deleteTemplate,
  })
}
