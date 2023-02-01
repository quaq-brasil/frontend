import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "../../apiClient"

type useGetTemplateUrlProps = {
  name: string
  pageId: string
}

export const useGetTemplateUrl = () => {
  const getPageUrl = async (data: useGetTemplateUrlProps) => {
    const response: UseMutationResult<string> = await api.post(
      `/pages/generate_unique_url`,
      data
    )
    return response.data as string
  }

  return useMutation({
    mutationKey: ["getPageUrl"],
    mutationFn: getPageUrl,
  })
}
