import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IInteraction } from "./../../../types/Interaction.type"

type useInteractionProps = {
  id: string
} & useQueryProps

export const useInteraction = ({ id, options }: useInteractionProps) => {
  const getInteraction = async () => {
    return api.get(`/interaction/${id}`)
  }

  const response = useQuery({
    queryKey: ["getInteraction", id],
    queryFn: getInteraction,
    ...options,
  }) as UseQueryResult<{ data: IInteraction }>

  return response.data
}
