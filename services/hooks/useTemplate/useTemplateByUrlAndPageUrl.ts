import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getTemplateByUrlAndPageUrlProps } from "../../../types/Template.type"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useTemplateByUrlProps = {
  url: string
  page_url: string
} & useQueryProps

export const useTemplateByUrlAndPageUrl = ({
  url,
  page_url,
  options,
}: useTemplateByUrlProps) => {
  const getTemplateByUrlAndPageUrl = async () => {
    return api.get(`/templates/${page_url}/${url}`)
  }

  const response = useQuery({
    queryKey: ["getTemplateByUrlAndPageUrl", url, page_url],
    queryFn: getTemplateByUrlAndPageUrl,
    ...options,
  }) as UseQueryResult<{ data: getTemplateByUrlAndPageUrlProps }>

  return response.data
}
