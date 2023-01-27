import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IPage } from "./../../../types/Page.type"

export const usePage = ({ options }: useQueryProps) => {
  const getPages = async () => {
    return api.get(`/pages`)
  }

  const response = useQuery({
    queryKey: ["getPages"],
    queryFn: getPages,
    ...options,
  }) as UseQueryResult<{ data: IPage[] }>

  return response.data
}
