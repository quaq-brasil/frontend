import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "services/api"
import { useMutationProps } from "types/useQueryProps"

type dataProps = {
  id?: string
  title: string
  page_id: string
}

type useGenerateTemplateUniqueSlugProps = {
  data: dataProps
} & useMutationProps

export const useGenerateTemplateUniqueSlug = () => {
  const generateTemplateUniqueSlug = async ({
    data,
  }: useGenerateTemplateUniqueSlugProps) => {
    const response: UseMutationResult<string> = await api.post(
      `/templates/generate_unique_slug`,
      data
    )

    return response.data
  }

  return useMutation({
    mutationKey: ["generateTemplateUniqueSlug"],
    mutationFn: generateTemplateUniqueSlug,
  })
}
