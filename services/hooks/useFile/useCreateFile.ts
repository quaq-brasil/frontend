import { useMutation } from "@tanstack/react-query"
import { IFile } from "../../../types/File.types"
import { api } from "../../apiClient"

export const useCreateFile = () => {
  const createFile = async (data: IFile) => {
    await api.post(`/file`, data)
  }

  return useMutation({
    mutationKey: ["createFile"],
    mutationFn: createFile,
  })
}
