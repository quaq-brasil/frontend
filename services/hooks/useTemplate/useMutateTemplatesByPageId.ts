import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { ITemplate } from "../../../types/Template.type"
import { api } from "../../apiClient"

type useMutateTemplatesByPageIdPros = {
  id: string
}

export const useMutateTemplatesByPageId = () => {
  const getTemplatesByPageId = async ({
    id,
  }: useMutateTemplatesByPageIdPros) => {
    const response: UseMutationResult<ITemplate[]> = await api.get(
      `/templates/page/${id}`
    )
    return response.data as ITemplate[]
  }

  return useMutation({
    mutationKey: ["getTemplatesByPageId"],
    mutationFn: getTemplatesByPageId,
  })
}
