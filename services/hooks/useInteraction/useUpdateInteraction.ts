import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IInteraction } from "./../../../types/Interaction.type"

type useUpdateInteractionProps = {
  id: string
  data: IInteraction
} & useMutationProps

export const useUpdateInteraction = ({
  id,
  data,
  options,
}: useUpdateInteractionProps) => {
  const updateInteraction = async () => {
    await api.put(`/interactions/${id}`, { data })
  }

  return useMutation({
    mutationKey: ["updateInteraction", id],
    mutationFn: updateInteraction,
    ...options,
  })
}
