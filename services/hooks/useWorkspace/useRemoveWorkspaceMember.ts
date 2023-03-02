import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { IWorkspace } from "../../../types/Workspace.type"
import { api } from "../../api"

type useRemoveWorkspaceMemberPros = {
  workspaceId: string
  memberId: string
}

export const useRemoveWorkspaceMember = () => {
  const removeWorkspaceMember = async ({
    workspaceId,
    memberId,
  }: useRemoveWorkspaceMemberPros) => {
    const response: UseMutationResult<IWorkspace> = await api.post(
      `/workspaces/members/remove/${workspaceId}`,
      { user_id: memberId }
    )
    return response.data as IWorkspace
  }

  return useMutation({
    mutationKey: ["removeWorkspaceMember"],
    mutationFn: removeWorkspaceMember,
  })
}
