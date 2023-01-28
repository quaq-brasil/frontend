import { useMutation } from "@tanstack/react-query"
import { IUpdatePage } from "../../../types/Page.type"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"

type useUpdatePageProps = {
  id: string
  data: IUpdatePage
} & useMutationProps

export const useUpdatePage = () => {
  const updatePage = async ({ id, data }: useUpdatePageProps) => {
    await api.put(`/pages/${id}`, data)
  }

  return useMutation({
    mutationKey: ["updatePage"],
    mutationFn: updatePage,
  })
}
