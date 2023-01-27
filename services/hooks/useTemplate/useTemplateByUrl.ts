import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { ITemplate } from "../../../types/Template.type"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useTemplateByUrlProps = {
  url: string
} & useQueryProps

export const useTemplateByUrl = ({ url, options }: useTemplateByUrlProps) => {
  const getTemplateByUrl = async () => {
    return api.get(`/templates/url/${url}`)
  }

  const response = useQuery({
    queryKey: ["getTemplateByUrl", url],
    queryFn: getTemplateByUrl,
    ...options,
  }) as UseQueryResult<{ data: ITemplate }>

  return response.data
}
