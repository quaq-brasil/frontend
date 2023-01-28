import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useDeleteTemplateProps = {
  id: string
} & useMutationProps

export const useDeleteTemplate = ({ id, options }: useDeleteTemplateProps) => {
  const deleteTemplate = async () => {
    await api.delete(`/templates/${id}`)
  }

  return useMutation({
    mutationKey: ["deleteTemplate", id],
    mutationFn: deleteTemplate,
    ...options,
  })
}
