import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IPage } from "types/Page.type"
import { useQueryProps } from "types/useQueryProps"

type usePageProps = {
  id: string
} & useQueryProps

export const usePage = ({ id, options }: usePageProps) => {
  const getPage = async () => {
    return api.get(`/pages/${id}`)
  }

  const response = useQuery({
    queryKey: ["getPage", id],
    queryFn: getPage,
    ...options,
  }) as UseQueryResult<{ data: IPage }>

  return response.data
}
