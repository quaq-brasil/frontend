import { useMutation } from "@tanstack/react-query"
import { IUpateTemplate } from "../../../types/Template.type"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useUpdateTemplateProps = {
  id: string
  data: IUpateTemplate
} & useMutationProps

export const useUpdateTemplate = () => {
  const updateTemplate = async ({ id, data }: useUpdateTemplateProps) => {
    await api.put(`/template/${id}`, data)
  }

  return useMutation({
    mutationKey: ["updateTemplate"],
    mutationFn: updateTemplate,
  })
}
