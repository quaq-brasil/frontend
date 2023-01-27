import { useMutation } from "@tanstack/react-query"
import { ITemplate } from "../../../types/Template.type"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useCreateTemplateProps = {
  data: ITemplate
} & useMutationProps

export const useCreateTemplate = () => {
  const createTemplate = async ({ data }: useCreateTemplateProps) => {
    await api.post(`/templates`, data)
  }

  return useMutation({
    mutationKey: ["createTemplate"],
    mutationFn: createTemplate,
  })
}
