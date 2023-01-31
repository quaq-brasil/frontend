import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "../../apiClient"

type useGetPageUrlProps = {
  name: string
}

export const useGetPageUrl = () => {
  const getPageUrl = async ({ name }: useGetPageUrlProps) => {
    const response: UseMutationResult<string> = await api.post(
      `/pages/generate_unique_url`,
      { name }
    )
    return response.data as string
  }

  return useMutation({
    mutationKey: ["getPageUrl"],
    mutationFn: getPageUrl,
  })
}
