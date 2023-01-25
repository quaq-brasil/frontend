import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { ITemplate } from "../../../types/Template.type"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useTemplateProps = {
  id: string
} & useQueryProps

export const useTemplate = ({ id, options }: useTemplateProps) => {
  const getTemplate = async () => {
    return api.get(`/template/${id}`)
  }

  const response = useQuery({
    queryKey: ["getTemplate", id],
    queryFn: getTemplate,
    ...options,
  }) as UseQueryResult<{ data: ITemplate }>

  return response.data
}
