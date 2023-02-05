import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { IPublication } from "../../../types/Publication.type"
import { api } from "../../apiClient"

type useMutatePublicationsByTemplateIdPros = {
  id: string
}

export const useMutatePublicationsByTemplateId = () => {
  const getPublicationsByTemplateId = async ({
    id,
  }: useMutatePublicationsByTemplateIdPros) => {
    const response: UseMutationResult<IPublication[]> = await api.get(
      `/publications/template/${id}`
    )
    return response.data as IPublication[]
  }

  return useMutation({
    mutationKey: ["getPublicationsByTemplateId"],
    mutationFn: getPublicationsByTemplateId,
  })
}
