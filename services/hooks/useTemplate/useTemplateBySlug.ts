import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { ITemplate } from "../../../types/Template.type"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../api"

type useTemplateBySlugProps = {
  slug: string
} & useQueryProps

export const useTemplateBySlug = ({
  slug,
  options,
}: useTemplateBySlugProps) => {
  const getTemplateBySlug = async () => {
    return api.get(`/templates/slug/${slug}`)
  }

  const response = useQuery({
    queryKey: ["getTemplateBySlug", slug],
    queryFn: getTemplateBySlug,
    ...options,
  }) as UseQueryResult<{ data: ITemplate }>

  return response.data
}
