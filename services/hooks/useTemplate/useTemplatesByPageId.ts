import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { ITemplate } from "types/Template.type"
import { useQueryProps } from "types/useQueryProps"

type useTemplatesByPageIdProps = {
  id: string
} & useQueryProps

export const useTemplatesByPageId = ({
  id,
  options,
}: useTemplatesByPageIdProps) => {
  const getTemplatesByPageId = async () => {
    return api.get(`/templates/page/${id}`)
  }

  const response = useQuery({
    queryKey: ["getTemplatesByPageId", id],
    queryFn: getTemplatesByPageId,
    ...options,
  }) as UseQueryResult<{ data: ITemplate[] }>

  return response.data
}
