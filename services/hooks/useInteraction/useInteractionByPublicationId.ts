import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IInteraction } from "types/Interaction.type"
import { useQueryProps } from "types/useQueryProps"

type useInteractionByPublicationIdProps = {
  id: string
} & useQueryProps

export const useInteractionByPublicationId = ({
  id,
  options,
}: useInteractionByPublicationIdProps) => {
  const getInteractionByPublicationId = async () => {
    return api.get(`/interactions/publication/${id}`)
  }

  const response = useQuery({
    queryKey: ["getInteractionByPublicationId", id],
    queryFn: getInteractionByPublicationId,
    ...options,
  }) as UseQueryResult<{ data: IInteraction }>

  return response.data
}
