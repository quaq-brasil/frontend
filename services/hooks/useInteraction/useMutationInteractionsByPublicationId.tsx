import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { IInteractionAndUser } from "../../../types/Interaction.type"
import { api } from "../../apiClient"

type useMutateInteractionsByPublicationIdPros = {
  id: string
}

export const useMutateInteractionsByPublicationId = () => {
  const getInteractionsByTemplateId = async ({
    id,
  }: useMutateInteractionsByPublicationIdPros) => {
    const response: UseMutationResult<IInteractionAndUser[]> = await api.get(
      `/interactions/publication/${id}`
    )
    return response.data as IInteractionAndUser[]
  }

  return useMutation({
    mutationKey: ["getInteractionsByTemplateId"],
    mutationFn: getInteractionsByTemplateId,
  })
}