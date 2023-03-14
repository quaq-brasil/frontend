import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "services/api"
import { ITemplate, IUpdateTemplate } from "types/Template.type"
import { useMutationProps } from "types/useQueryProps"

type useUpdateTemplateProps = {
  id: string
  data: IUpdateTemplate
} & useMutationProps

export const useUpdateTemplate = () => {
  const updateTemplate = async ({ id, data }: useUpdateTemplateProps) => {
    const response: UseMutationResult<ITemplate> = await api.put(
      `/templates/${id}`,
      data
    )
    return response.data as ITemplate
  }

  return useMutation({
    mutationKey: ["updateTemplate"],
    mutationFn: updateTemplate,
  })
}
