import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IWorkspace } from "./../../../types/Workspace.type"

type useCreateWorkspaceProps = {
  data: IWorkspace
} & useMutationProps

export const useCreateWorkspace = () => {
  const createWorkspace = async ({ data }: useCreateWorkspaceProps) => {
    const response: UseMutationResult<IWorkspace> = await api.post(
      `/workspaces`,
      data
    )

    return response.data as IWorkspace
  }

  return useMutation({
    mutationKey: ["createWorkspace"],
    mutationFn: createWorkspace,
  })
}
