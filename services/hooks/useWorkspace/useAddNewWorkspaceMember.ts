import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { IWorkspace } from "../../../types/Workspace.type"
import { api } from "../../api"

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
