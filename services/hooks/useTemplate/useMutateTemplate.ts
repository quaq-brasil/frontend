import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "services/api"
import { ITemplateLogs } from "types/Template.type"

type useMutateTemplatePros = {
  id: string
}

const config = {
  headers: {
    request: "logs",
  },
}

export const useMutateTemplate = () => {
  const getTemplateById = async ({ id }: useMutateTemplatePros) => {
    const response: UseMutationResult<ITemplateLogs> = await api.get(
      `/templates/${id}`,
      config
    )
    return response.data as ITemplateLogs
  }

  return useMutation({
    mutationKey: ["getTemplateById"],
    mutationFn: getTemplateById,
  })
}
