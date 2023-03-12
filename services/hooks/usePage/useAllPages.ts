import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IPage } from "types/Page.type"
import { useQueryProps } from "types/useQueryProps"

export const useAllPages = ({ options }: useQueryProps) => {
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
