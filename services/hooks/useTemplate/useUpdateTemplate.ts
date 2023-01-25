import { useMutation } from "@tanstack/react-query"
import { ITemplate } from "../../../types/Template.type"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useUpdateTemplateProps = {
  id: string
  data: ITemplate
} & useMutationProps

export const useUpdateTemplate = ({
  id,
  data,
  options,
}: useUpdateTemplateProps) => {
  const updateTemplate = async () => {
    await api.put(`/template/${id}`, { data })
  }

  return useMutation({
    mutationKey: ["updateTemplate", id],
    mutationFn: updateTemplate,
    ...options,
  })
}
