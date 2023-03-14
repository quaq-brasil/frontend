import { useMutation } from "@tanstack/react-query"
import { api } from "services/api"
import { IFile } from "types/File.types"
import { useMutationProps } from "types/useQueryProps"

type useUpdateFileProps = {
  id: string
  data: IFile
} & useMutationProps

export const useUpdateFile = ({ id, data }: useUpdateFileProps) => {
  const updateFile = async () => {
    await api.put(`/files/${id}`, data)
  }

  return useMutation({
    mutationKey: ["updateFile", id],
    mutationFn: updateFile,
  })
}
