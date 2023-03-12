import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IFile } from "types/File.types"
import { useQueryProps } from "types/useQueryProps"

type useFileProps = {
  id: string
} & useQueryProps

export const useFile = ({ id, options }: useFileProps) => {
  const getFile = async () => {
    return api.get(`/files/${id}`)
  }

  const response = useQuery({
    queryKey: ["getFile", id],
    queryFn: getFile,
    ...options,
  }) as UseQueryResult<{ data: IFile }>

  return response.data
}
