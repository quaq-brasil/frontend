import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IInteraction } from "types/Interaction.type"
import { useQueryProps } from "types/useQueryProps"

type useInteractionProps = {
  id: string
} & useQueryProps

export const useInteraction = ({ id, options }: useInteractionProps) => {
  const getInteraction = async () => {
    return api.get(`/interactions/${id}`)
  }

  const response = useQuery({
    queryKey: ["getInteraction", id],
    queryFn: getInteraction,
    ...options,
  }) as UseQueryResult<{ data: IInteraction }>

  return response.data
}
