import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { IUpdateWorkspace } from "../../../types/Workspace.type"
import { api } from "../../api"

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
