import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IPublication } from "./../../../types/Publication.type"

type useGetPublicationByTemplateIdProps = {
  id: string
} & useQueryProps

export const useGetPublicationByTemplateId = ({
  id,
  options,
}: useGetPublicationByTemplateIdProps) => {
  const getPublicationByTemplateId = async () => {
    return api.get(`/publications/template/${id}`)
  }

  const response = useQuery({
    queryKey: ["getPublicationByTemplateId", id],
    queryFn: getPublicationByTemplateId,
    ...options,
  }) as UseQueryResult<{ data: IPublication }>

  return response.data
}
