import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../api"
import { IPage } from "./../../../types/Page.type"

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
