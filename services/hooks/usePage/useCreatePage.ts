import { useMutation } from "@tanstack/react-query"
import { api } from "../../apiClient"
import { IPage } from "./../../../types/Page.type"

export const useCreatePage = () => {
  const createPage = async (data: IPage) => {
    await api.post(`/page`, data)
  }

  return useMutation({
    mutationKey: ["createPage"],
    mutationFn: createPage,
  })
}
