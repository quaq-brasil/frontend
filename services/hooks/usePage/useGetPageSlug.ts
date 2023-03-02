import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "../../api"

type useGetPageSlugProps = {
  id?: string
  name: string
}

export const useGetPageSlug = () => {
  const getPageSlug = async ({ name, id }: useGetPageSlugProps) => {
    const response: UseMutationResult<string> = await api.post(
      `/pages/generate_unique_slug`,
      { name, id }
    )
    return response.data
  }

  return useMutation({
    mutationKey: ["getPageSlug"],
    mutationFn: getPageSlug,
  })
}
