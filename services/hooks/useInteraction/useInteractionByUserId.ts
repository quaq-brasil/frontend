import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IInteraction } from "./../../../types/Interaction.type"

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
