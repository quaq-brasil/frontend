import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IWorkspace } from "./../../../types/Workspace.type"

type useUpdateWorkspaceProps = {
  id: string
  data: IWorkspace
} & useMutationProps

export const useUpdateWorkspace = ({
  id,
  data,
  options,
}: useUpdateWorkspaceProps) => {
  const updateWorkspace = async () => {
    await api.put(`/workspaces/${id}`, { data })
  }

  return useMutation({
    mutationKey: ["updateWorkspace", id],
    mutationFn: updateWorkspace,
    ...options,
  })
}
