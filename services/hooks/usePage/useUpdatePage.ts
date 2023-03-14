import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IPage, IUpdatePage } from "types/Page.type"
import { useMutationProps } from "types/useQueryProps"

type useUpdatePageProps = {
  id: string
  data: IUpdatePage
} & useMutationProps

export const useUpdatePage = () => {
  const updatePage = async ({ id, data }: useUpdatePageProps) => {
    const response: UseMutationResult<IPage> = await api.put(
      `/pages/${id}`,
      data
    )
    return response.data as IPage
  }

  return useMutation({
    mutationKey: ["updatePage"],
    mutationFn: updatePage,
  })
}
