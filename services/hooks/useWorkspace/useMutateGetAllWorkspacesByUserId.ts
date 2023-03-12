import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IWorkspace } from "types/Workspace.type"

type useMutateGetAllWorkspacesByUserIdPros = {
  id: string
}

export const useMutateGetAllWorkspacesByUserId = () => {
  const getAllWorkspacesByUserId = async ({
    id,
  }: useMutateGetAllWorkspacesByUserIdPros) => {
    const response: UseMutationResult<IWorkspace[]> = await api.get(
      `/workspaces/user/${id}`
    )
    return response.data as IWorkspace[]
  }

  return useMutation({
    mutationKey: ["getAllWorkspacesByUserId"],
    mutationFn: getAllWorkspacesByUserId,
  })
}
