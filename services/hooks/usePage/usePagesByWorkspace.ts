import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IPage } from "types/Page.type"
import { useQueryProps } from "types/useQueryProps"

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
