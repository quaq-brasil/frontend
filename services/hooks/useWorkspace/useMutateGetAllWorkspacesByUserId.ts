import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { IWorkspace } from "../../../types/Workspace.type"
import { api } from "../../api"

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
