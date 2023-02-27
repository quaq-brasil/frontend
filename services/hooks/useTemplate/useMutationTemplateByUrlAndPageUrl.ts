import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { getTemplateByUrlAndPageUrlProps } from "../../../types/Template.type"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../api"

type useTemplateByUrlAndPageUrlProps = {
  url: string
  page_url: string
} & useMutationProps

export const useTemplateByUrlAndPageUrl = () => {
  const getTemplateByUrlAndPageUrl = async ({
    url,
    page_url,
  }: useTemplateByUrlAndPageUrlProps) => {
    const response: UseMutationResult<getTemplateByUrlAndPageUrlProps> =
      await api.get(`/templates/${page_url}/${url}`)

    return response.data as getTemplateByUrlAndPageUrlProps
  }

  return useMutation({
    mutationKey: ["getTemplateByUrlAndPageUrlMutation"],
    mutationFn: getTemplateByUrlAndPageUrl,
  })
}
