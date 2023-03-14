import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IPublication } from "types/Publication.type"
import { useQueryProps } from "types/useQueryProps"

type usePublicationByPageIdProps = {
  id: string
} & useQueryProps

export const usePublicationByPageId = ({
  id,
  options,
}: usePublicationByPageIdProps) => {
  const getPublicationByPageId = async () => {
    return api.get(`/publications/page/${id}`)
  }

  const response = useQuery({
    queryKey: ["getPublicationByPageId", id],
    queryFn: getPublicationByPageId,
    ...options,
  }) as UseQueryResult<{ data: IPublication }>

  return response.data
}
