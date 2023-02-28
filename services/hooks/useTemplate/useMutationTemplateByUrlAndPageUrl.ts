import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { getTemplateBySlugAndPageSlugProps } from "./../../../types/Template.type"

import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../api"

type useTemplateByUrlAndPageUrlProps = {
  url: string
  page_url: string
} & useMutationProps

export const useMutationTemplateBySlugAndPageSlug = () => {
  const getTemplateByUrlAndPageUrl = async ({
    url,
    page_url,
  }: useTemplateByUrlAndPageUrlProps) => {
    const response: UseMutationResult<getTemplateBySlugAndPageSlugProps> =
      await api.get(`/templates/${page_url}/${url}`)

    return response.data as getTemplateBySlugAndPageSlugProps
  }

  return useMutation({
    mutationKey: ["getTemplateByUrlAndPageUrlMutation"],
    mutationFn: getTemplateByUrlAndPageUrl,
  })
}
