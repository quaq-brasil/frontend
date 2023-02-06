import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { IInteraction } from "../../../types/Interaction.type"
import { api } from "../../apiClient"

export const useCreateInteraction = () => {
  const useCreateInteraction = async (data: IInteraction) => {
    const response: UseMutationResult<IInteraction> = await api.post(
      `/interactions`,
      data
    )

    return response.data as IInteraction
  }

  return useMutation({
    mutationKey: ["useCreateInteraction"],
    mutationFn: useCreateInteraction,
  })
}
