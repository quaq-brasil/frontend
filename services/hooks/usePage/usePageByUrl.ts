import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IPage } from "./../../../types/Page.type"

type usePageByUrlProps = {
  url: string
} & useQueryProps

export const usePageByUrl = ({ url, options }: usePageByUrlProps) => {
  const getPageByUrl = async () => {
    return api.get(`/page/url/${url}`)
  }

  const response = useQuery({
    queryKey: ["getPageByUrl", url],
    queryFn: getPageByUrl,
    ...options,
  }) as UseQueryResult<{ data: IPage }>

  return response.data
}
