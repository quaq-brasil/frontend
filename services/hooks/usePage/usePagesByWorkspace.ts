import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../api"
import { IPage } from "./../../../types/Page.type"

type usePagesByWorkspaceProps = {
  id: string
} & useQueryProps

export const usePagesByWorkspace = ({
  id,
  options,
}: usePagesByWorkspaceProps) => {
  const getPagesByWorkspace = async () => {
    return api.get(`/pages/workspace/${id}`)
  }

  const response = useQuery({
    queryKey: ["getPagesByWorkspace"],
    queryFn: getPagesByWorkspace,
    ...options,
  }) as UseQueryResult<{ data: IPage[] }>

  return response.data
}
