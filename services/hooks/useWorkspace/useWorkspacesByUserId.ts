import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IWorkspace } from "./../../../types/Workspace.type"

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
