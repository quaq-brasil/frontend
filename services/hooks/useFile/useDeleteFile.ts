import { useMutation } from "@tanstack/react-query"
import { api } from "services/api"
import { useMutationProps } from "types/useQueryProps"

type useDeleteFileProps = {
  id: string
} & useMutationProps

export const useDeleteFile = ({ id }: useDeleteFileProps) => {
  const deleteFile = async () => {
    await api.delete(`/files/${id}`)
  }

  return useMutation({
    mutationKey: ["deleteFile", id],
    mutationFn: deleteFile,
  })
}
