import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { ITemplate } from "types/Template.type"
import { useQueryProps } from "types/useQueryProps"

type useTemplateProps = {
  id: string
} & useQueryProps

export const useTemplate = ({ id, options }: useTemplateProps) => {
  const getTemplate = async () => {
    return api.get(`/templates/${id}`)
  }

  const response = useQuery({
    queryKey: ["getTemplate", id],
    queryFn: getTemplate,
    ...options,
  }) as UseQueryResult<{ data: ITemplate }>

  return response.data
}
