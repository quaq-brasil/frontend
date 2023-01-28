import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { IPublication } from "../../../types/Publication.type"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type usePublicationProps = {
  id: string
} & useQueryProps

export const usePublication = ({ id, options }: usePublicationProps) => {
  const getPublication = async () => {
    return api.get(`/publications/${id}`)
  }

  const response = useQuery({
    queryKey: ["getPublication", id],
    queryFn: getPublication,
    ...options,
  }) as UseQueryResult<{ data: IPublication }>

  return response.data
}
