import { useQuery, UseQueryResult } from "@tanstack/react-query"
import Router from "next/router"
import { api } from "services/api"
import { IPage } from "types/Page.type"
import { useQueryProps } from "types/useQueryProps"

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
    ...options,
    onError(err) {
      Router.push("/laliga/win-a-trip-to-spain")
    },
  }) as UseQueryResult<{ data: IPage }>

  return response.data
}
