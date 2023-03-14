import { useMutation } from "@tanstack/react-query"
import { api } from "services/api"
import { IFile } from "types/File.types"

export const useCreateFile = () => {
  const createFile = async (file: File) => {
    const data = new FormData()
    data.append("file", file, file.name)

    const response = await api.post("/fileUpload", data, {
      headers: {
        accept: "application/json",
        //@ts-ignore
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      },
    })

    return response.data as IFile
  }

  return useMutation({
    mutationKey: ["createFile"],
    mutationFn: createFile,
  })
}
