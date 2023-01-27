import { useMutation } from "@tanstack/react-query"
import { api } from "../../apiClient"
import { IPage } from "./../../../types/Page.type"

type useCreatePageProps = {
  data: IPage
}

export const useCreatePage = () => {
  const createPage = async ({ data }: useCreatePageProps) => {
    await api.post(`/pages`, data)
  }

  return useMutation({
    mutationKey: ["createPage"],
    mutationFn: createPage,
  })
}
