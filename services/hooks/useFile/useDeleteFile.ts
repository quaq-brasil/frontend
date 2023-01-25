import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useDeleteFileProps = {
  id: string
} & useMutationProps

export const useDeleteFile = ({ id, options }: useDeleteFileProps) => {
  const deleteFile = async () => {
    await api.delete(`/file/${id}`)
  }

  return useMutation({
    mutationKey: ["deleteFile", id],
    mutationFn: deleteFile,
    ...options,
  })
}
