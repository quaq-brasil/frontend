import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IPage } from "./../../../types/Page.type"

type usePageProps = {
  id: string
} & useQueryProps

export const usePage = ({ id, options }: usePageProps) => {
  const getPage = async () => {
    return api.get(`/page/${id}`)
  }

  const response = useQuery({
    queryKey: ["getPage", id],
    queryFn: getPage,
    ...options,
  }) as UseQueryResult<{ data: IPage }>

  return response.data
}
