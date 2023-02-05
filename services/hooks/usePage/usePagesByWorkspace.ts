import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IPage } from "./../../../types/Page.type"

type usePagesByWorkspaceProps = {
  id: string
} & useQueryProps

export const usePagesByWorkspace = ({ id }: usePagesByWorkspaceProps) => {
  const getPagesByWorkspace = async () => {
    return api.get(`/pages/workspace/${id}`)
  }

  const response = useQuery({
    queryKey: ["getPagesByWorkspace"],
    queryFn: getPagesByWorkspace,
  }) as UseQueryResult<{ data: IPage[] }>

  return response.data
}
