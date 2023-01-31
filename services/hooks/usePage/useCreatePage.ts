import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "../../apiClient"
import { IPage } from "./../../../types/Page.type"

type useCreatePageProps = {
  data: IPage
}

export const useCreatePage = () => {
  const createPage = async ({ data }: useCreatePageProps) => {
    const response: UseMutationResult<IPage> = await api.post(`/pages`, data)
    return response.data as IPage
  }

  return useMutation({
    mutationKey: ["createPage"],
    mutationFn: createPage,
  })
}
