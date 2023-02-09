import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type dataProps = {
  id?: string
  title: string
  page_id: string
}

type useGenerateTemplateUniqueUrlProps = {
  data: dataProps
} & useMutationProps

export const useGenerateTemplateUniqueUrl = () => {
  const generateTemplateUniqueUrl = async ({
    data,
  }: useGenerateTemplateUniqueUrlProps) => {
    const response: UseMutationResult<string> = await api.post(
      `/templates/generate_unique_url`,
      data
    )

    return response.data as string
  }

  return useMutation({
    mutationKey: ["generateTemplateUniqueUrl"],
    mutationFn: generateTemplateUniqueUrl,
  })
}
