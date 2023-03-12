import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IInteraction } from "types/Interaction.type"
import { useQueryProps } from "types/useQueryProps"

type useInteractionByUserIdProps = {
  id: string
} & useQueryProps

export const useInteractionByUserId = ({
  id,
  options,
}: useInteractionByUserIdProps) => {
  const getInteractionByUserId = async () => {
    return api.get(`/interactions/user/${id}`)
  }

  const response = useQuery({
    queryKey: ["getInteractionByUserId", id],
    queryFn: getInteractionByUserId,
    ...options,
  }) as UseQueryResult<{ data: IInteraction }>

  return response.data
}
