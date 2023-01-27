import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IInteraction } from "./../../../types/Interaction.type"

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
