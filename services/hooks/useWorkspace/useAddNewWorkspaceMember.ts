import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IWorkspace } from "types/Workspace.type"

type useAddNewWorkspaceMemberPros = {
  workspaceId: string
  newMemberEmail: string
}

export const useAddNewWorkspaceMember = () => {
  const addNewWorkspaceMember = async ({
    workspaceId,
    newMemberEmail,
  }: useAddNewWorkspaceMemberPros) => {
    const response: UseMutationResult<IWorkspace> = await api.post(
      `/workspaces/members/add/${workspaceId}`,
      { email: newMemberEmail }
    )
    return response.data as IWorkspace
  }

  return useMutation({
    mutationKey: ["addNewWorkspaceMember"],
    mutationFn: addNewWorkspaceMember,
  })
}
