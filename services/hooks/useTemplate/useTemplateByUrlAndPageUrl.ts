import { useQuery, UseQueryResult } from "@tanstack/react-query"
import Router from "next/router"
import { useEffect } from "react"
import { api } from "services/api"
import { getTemplateBySlugAndPageSlugProps } from "types/Template.type"
import { useQueryProps } from "types/useQueryProps"

type useTemplateBySlugProps = {
  slug: string
  page_slug: string
  consumer_id?: string
  autoUpdate?: boolean
} & useQueryProps

export const useTemplateBySlugAndPageSlug = ({
  slug,
  page_slug,
  consumer_id,
  options,
  autoUpdate = false,
}: useTemplateBySlugProps) => {
  let path = `/templates/${page_slug}/${slug}`

  if (consumer_id) {
    path = `${path}/${consumer_id}`
  }

  const getTemplateBySlugAndPageSlug = async () => {
    return api.get(path)
  }

  const { data, refetch } = useQuery({
    queryKey: ["getTemplateBySlugAndPageSlug", slug, page_slug, consumer_id],
    queryFn: getTemplateBySlugAndPageSlug,
    ...options,
    onError(err) {
      Router.push("/404")
    },
  }) as UseQueryResult<{ data: getTemplateBySlugAndPageSlugProps }>

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (autoUpdate) {
      interval = setInterval(() => {
        refetch()
      }, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoUpdate, refetch])

  return data
}
