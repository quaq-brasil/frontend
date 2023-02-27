import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../api"
import { IWorkspace } from "./../../../types/Workspace.type"

type useWorkspaceProps = {
  id: string
} & useQueryProps

export const useWorkspace = ({ id, options }: useWorkspaceProps) => {
  const getWorkspace = async () => {
    return api.get(`/workspaces/${id}`)
  }

  const response = useQuery({
    queryKey: ["geWorkspace", id],
    queryFn: getWorkspace,
    ...options,
  }) as UseQueryResult<{ data: IWorkspace }>

  return response.data
}
