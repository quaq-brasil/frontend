import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IFile } from "types/File.types"
import { useQueryProps } from "types/useQueryProps"

type useFileByUrlProps = {
  url: string
} & useQueryProps

export const useFileByUrl = ({ url, options }: useFileByUrlProps) => {
  const getFileByUrl = async () => {
    return api.get(`/files/url/${url}`)
  }

  const response = useQuery({
    queryKey: ["getFileByUrl", url],
    queryFn: getFileByUrl,
    ...options,
  }) as UseQueryResult<{ data: IFile }>

  return response.data
}
