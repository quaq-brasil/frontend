import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getTemplateByUrlAndPageUrlProps } from "../../../types/Template.type"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useTemplateByUrlProps = {
  url: string
  page_url: string
  consumer_id?: string
} & useQueryProps

export const useTemplateByUrlAndPageUrl = ({
  url,
  page_url,
  consumer_id,
  options,
}: useTemplateByUrlProps) => {
  let path = `/templates/${page_url}/${url}`

  if (consumer_id) {
    path = `${path}/${consumer_id}`
  }

  const getTemplateByUrlAndPageUrl = async () => {
    return api.get(path)
  }

  const response = useQuery({
    queryKey: ["getTemplateByUrlAndPageUrl", url, page_url, consumer_id],
    queryFn: getTemplateByUrlAndPageUrl,
    ...options,
  }) as UseQueryResult<{ data: getTemplateByUrlAndPageUrlProps }>

  return response.data
}
