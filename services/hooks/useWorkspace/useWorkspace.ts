import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IWorkspace } from "./../../../types/Workspace.type"

type useWorkspaceProps = {
  id: string
} & useQueryProps

export const useWorkspace = ({ id, options }: useWorkspaceProps) => {
  const geWorkspace = async () => {
    return api.get(`/workspaces/${id}`)
  }

  const response = useQuery({
    queryKey: ["geWorkspace", id],
    queryFn: geWorkspace,
    ...options,
  }) as UseQueryResult<{ data: IWorkspace }>

  return response.data
}
