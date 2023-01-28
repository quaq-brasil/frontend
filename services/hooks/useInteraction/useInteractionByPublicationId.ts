import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IInteraction } from "./../../../types/Interaction.type"

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
