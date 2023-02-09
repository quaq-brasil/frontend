import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { IUpdateTemplate } from "../../../types/Template.type"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { ITemplate } from "./../../../types/Template.type"

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
