import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../api"

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

    return response.data as string
  }

  return useMutation({
    mutationKey: ["generateTemplateUniqueSlug"],
    mutationFn: generateTemplateUniqueSlug,
  })
}
