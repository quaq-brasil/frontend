import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "../../apiClient"

type useGetPageUrlProps = {
  id?: string
  name: string
}

export const useGetPageUrl = () => {
  const getPageUrl = async ({ name, id }: useGetPageUrlProps) => {
    const response: UseMutationResult<string> = await api.post(
      `/pages/generate_unique_url`,
      { name, id }
    )
    return response.data as string
  }

  return useMutation({
    mutationKey: ["getPageUrl"],
    mutationFn: getPageUrl,
  })
}
