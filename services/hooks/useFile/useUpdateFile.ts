import { useMutation } from "@tanstack/react-query"
import { IFile } from "../../../types/File.types"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useUpdateFileProps = {
  id: string
  data: IFile
} & useMutationProps

export const useUpdateFile = ({ id, data, options }: useUpdateFileProps) => {
  const updateFile = async () => {
    await api.put(`/files/${id}`, { data })
  }

  return useMutation({
    mutationKey: ["updateFile", id],
    mutationFn: updateFile,
    ...options,
  })
}
