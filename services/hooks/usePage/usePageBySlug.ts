import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { IPage } from "../../../types/Page.type"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../api"

type usePageBySlugProps = {
  slug: string
} & useQueryProps

export const usePageBySlug = ({ slug, options }: usePageBySlugProps) => {
  const getPageBySlug = async () => {
    return api.get(`/pages/slug/${slug}`)
  }

  const response = useQuery({
    queryKey: ["getPageBySlug", slug],
    queryFn: getPageBySlug,
    staleTime: 1000 * 60, // 1 minute
    ...options,
  }) as UseQueryResult<{ data: IPage }>

  return response.data
}
