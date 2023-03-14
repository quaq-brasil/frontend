import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IInteraction } from "types/Interaction.type"
import { useQueryProps } from "types/useQueryProps"

type useInteractionByPageIdProps = {
  id: string
} & useQueryProps

export const useInteractionByPageId = ({
  id,
  options,
}: useInteractionByPageIdProps) => {
  const getInteractionByPageId = async () => {
    return api.get(`/interactions/page/${id}`)
  }

  const response = useQuery({
    queryKey: ["getInteractionByPageId", id],
    queryFn: getInteractionByPageId,
    ...options,
  }) as UseQueryResult<{ data: IInteraction }>

  return response.data
}
