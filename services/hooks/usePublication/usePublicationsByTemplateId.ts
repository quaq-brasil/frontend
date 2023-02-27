import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../api"
import { IPublication } from "./../../../types/Publication.type"

type usePublicationByTemplateIdProps = {
  id: string
} & useQueryProps

export const usePublicationByTemplateId = ({
  id,
  options,
}: usePublicationByTemplateIdProps) => {
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
