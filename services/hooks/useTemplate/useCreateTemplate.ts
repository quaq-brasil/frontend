import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { ITemplate } from "../../../types/Template.type"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../api"

type useCreateTemplateProps = {
  data: ITemplate
} & useMutationProps

export const useCreateTemplate = () => {
  const createTemplate = async ({ data }: useCreateTemplateProps) => {
    const response: UseMutationResult<ITemplate> = await api.post(
      `/templates`,
      data
    )

    return response.data as ITemplate
  }

  return useMutation({
    mutationKey: ["createTemplate"],
    mutationFn: createTemplate,
  })
}
