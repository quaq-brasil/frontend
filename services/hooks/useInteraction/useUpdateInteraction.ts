import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IInteraction } from "types/Interaction.type"
import { useMutationProps } from "types/useQueryProps"

type useUpdateInteractionProps = {
  id: string
  data: IInteraction
} & useMutationProps

export const useUpdateInteraction = () => {
  const updateInteraction = async ({ id, data }: useUpdateInteractionProps) => {
    const response: UseMutationResult<IInteraction> = await api.put(
      `/interactions/${id}`,
      data
    )

    return response.data as any
  }

  return useMutation({
    mutationKey: ["updateInteraction"],
    mutationFn: updateInteraction,
  })
}
