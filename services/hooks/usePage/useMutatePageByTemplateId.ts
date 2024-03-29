import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IPage } from "types/Page.type"
import { useMutationProps } from "types/useQueryProps"

type useMutatePageByTemplateIdProps = {
  id: string
} & useMutationProps

export const useMutatePageByTemplateId = () => {
  const getPage = async ({ id }: useMutatePageByTemplateIdProps) => {
    const response: UseMutationResult<IPage> = await api.put(`/pages/${id}`, {})
    return response.data as IPage
  }

  return useMutation({
    mutationKey: ["getPage"],
    mutationFn: getPage,
  })
}
