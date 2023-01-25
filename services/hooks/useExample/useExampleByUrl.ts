import { useQuery } from "@tanstack/react-query"
import { useQueryProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useExampleByUrlProps = {
  url: string
} & useQueryProps

export const useExampleByUrl = ({ url, options }: useExampleByUrlProps) => {
  const getExampleByUrl = async () => {
    await api.get(`/example/${url}`)
  }

  return useQuery({
    queryKey: ["example", url],
    queryFn: getExampleByUrl,
    ...options,
  })
}
