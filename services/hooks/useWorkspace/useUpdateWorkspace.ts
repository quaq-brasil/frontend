import { useMutation } from "@tanstack/react-query"
import { api } from "services/api"
import { useMutationProps } from "types/useQueryProps"
import { IUpdateWorkspace } from "types/Workspace.type"

type useUpdateWorkspaceProps = {
  id: string
  data: IUpdateWorkspace
} & useMutationProps

export const useUpdateWorkspace = () => {
  const updateWorkspace = async ({ id, data }: useUpdateWorkspaceProps) => {
    await api.put(`/workspaces/${id}`, data)
  }

  return useMutation({
    mutationKey: ["updateWorkspace"],
    mutationFn: updateWorkspace,
  })
}
