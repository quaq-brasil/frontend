import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { IFile } from "../../../types/File.types"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useFileByUrlProps = {
  url: string
} & useQueryProps

export const useFileByUrl = ({ url, options }: useFileByUrlProps) => {
  const getFileByUrl = async () => {
    return api.get(`/file/url/${url}`)
  }

  const response = useQuery({
    queryKey: ["getFileByUrl", url],
    queryFn: getFileByUrl,
    ...options,
  }) as UseQueryResult<{ data: IFile }>

  return response.data
}
