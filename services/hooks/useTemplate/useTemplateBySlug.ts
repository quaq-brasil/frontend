import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { ITemplate } from "../../../types/Template.type"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../api"

type useTemplateBySlugProps = {
  templateSlug: string
  pageSlug: string
} & useQueryProps

export const useTemplateBySlug = ({
  templateSlug,
  pageSlug,
  options,
}: useTemplateBySlugProps) => {
  const getTemplateBySlug = async () => {
    return api.get(`/templates/${pageSlug}/${templateSlug}`)
  }

  const response = useQuery({
    queryKey: ["getTemplateBySlug", templateSlug],
    queryFn: getTemplateBySlug,
    ...options,
  }) as UseQueryResult<{ data: ITemplate }>

  return response.data
}
