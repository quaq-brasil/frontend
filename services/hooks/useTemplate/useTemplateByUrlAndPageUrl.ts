import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { getTemplateBySlugAndPageSlugProps } from "types/Template.type"
import { useQueryProps } from "types/useQueryProps"

type useTemplateBySlugProps = {
  slug: string
  page_slug: string
  consumer_id?: string
} & useQueryProps

export const useTemplateBySlugAndPageSlug = ({
  slug,
  page_slug,
  consumer_id,
  options,
}: useTemplateBySlugProps) => {
  let path = `/templates/${page_slug}/${slug}`

  if (consumer_id) {
    path = `${path}/${consumer_id}`
  }

  const getTemplateBySlugAndPageSlug = async () => {
    return api.get(path)
  }

  const response = useQuery({
    queryKey: ["getTemplateBySlugAndPageSlug", slug, page_slug, consumer_id],
    queryFn: getTemplateBySlugAndPageSlug,
    ...options,
  }) as UseQueryResult<{ data: getTemplateBySlugAndPageSlugProps }>

  return response.data
}
