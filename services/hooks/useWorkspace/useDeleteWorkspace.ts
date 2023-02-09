import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useDeleteWorkspaceProps = {
  id: string
} & useMutationProps

export const useDeleteWorkspace = () => {
  const deleteWorkspace = async ({ id }: useDeleteWorkspaceProps) => {
    await api.delete(`/workspaces/${id}`)
  }

  return useMutation({
    mutationKey: ["deleteWorkspace"],
    mutationFn: deleteWorkspace,
  })
}
