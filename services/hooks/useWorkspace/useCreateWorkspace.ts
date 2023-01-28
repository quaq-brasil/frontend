import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IWorkspace } from "./../../../types/Workspace.type"

type useCreateWorkspaceProps = {
  data: IWorkspace
} & useMutationProps

export const useCreateWorkspace = () => {
  const createWorkspace = async ({ data }: useCreateWorkspaceProps) => {
    await api.post(`/workspaces`, data)
  }

  return useMutation({
    mutationKey: ["createWorkspace"],
    mutationFn: createWorkspace,
  })
}
