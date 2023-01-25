import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useDeleteWorkspaceProps = {
  id: string
} & useMutationProps

export const useDeleteWorkspace = ({
  id,
  options,
}: useDeleteWorkspaceProps) => {
  const deleteWorkspace = async () => {
    await api.delete(`/workspace/${id}`)
  }

  return useMutation({
    mutationKey: ["deleteWorkspace", id],
    mutationFn: deleteWorkspace,
    ...options,
  })
}
