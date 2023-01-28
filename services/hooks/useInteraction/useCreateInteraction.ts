import { useMutation } from "@tanstack/react-query"
import { api } from "../../apiClient"
import { IPage } from "./../../../types/Page.type"

export const useCreateInteraction = () => {
  const createPage = async (data: IPage) => {
    await api.post(`/pages`, data)
  }

  return useMutation({
    mutationKey: ["createPage"],
    mutationFn: createPage,
  })
}
