import { useMutation } from "@tanstack/react-query"
import { IUpdateTemplate } from "../../../types/Template.type"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useUpdateTemplateProps = {
  id: string
  data: IUpdateTemplate
} & useMutationProps

export const useUpdateTemplate = () => {
  const updateTemplate = async ({ id, data }: useUpdateTemplateProps) => {
    await api.put(`/templates/${id}`, data)
  }

  return useMutation({
    mutationKey: ["updateTemplate"],
    mutationFn: updateTemplate,
  })
}
