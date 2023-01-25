import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IPage } from "./../../../types/Page.type"

type useUpdatePageProps = {
  id: string
  data: IPage
} & useMutationProps

export const useUpdatePage = ({ id, data, options }: useUpdatePageProps) => {
  const updatePage = async () => {
    await api.put(`/page/${id}`, { data })
  }

  return useMutation({
    mutationKey: ["updatePage", id],
    mutationFn: updatePage,
    ...options,
  })
}
