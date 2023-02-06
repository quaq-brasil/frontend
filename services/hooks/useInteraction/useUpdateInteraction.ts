import { useMutation } from "@tanstack/react-query"
import { IInteraction } from "../../../types/Interaction.type"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useUpdateInteractionProps = {
  id: string
  data: IInteraction
} & useMutationProps

export const useUpdateInteraction = () => {
  const updateInteraction = async ({ id, data }: useUpdateInteractionProps) => {
    await api.put(`/interactions/${id}`, data)
  }

  return useMutation({
    mutationKey: ["updateInteraction"],
    mutationFn: updateInteraction,
  })
}
