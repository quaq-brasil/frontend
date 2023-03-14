import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { useQueryProps } from "types/useQueryProps"
import { IWorkspace } from "types/Workspace.type"

type useWorkspacesByUserIdProps = {
  id: string
} & useQueryProps

export const useWorkspacesByUserId = ({
  id,
  options,
}: useWorkspacesByUserIdProps) => {
  const getWorkspacesByUserId = async () => {
    return api.get(`/workspaces/user/${id}`)
  }

  const response = useQuery({
    queryKey: ["getWorkspacesByUserId", id],
    queryFn: getWorkspacesByUserId,
    ...options,
  }) as UseQueryResult<{ data: IWorkspace[] }>

  return response.data
}
