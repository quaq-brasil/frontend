import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { IPage } from "../../../types/Page.type"
import { api } from "../../api"

type useMutatePagesByWorkspaceIdPros = {
  id: string
}

export const useMutatePagesByWorkspaceId = () => {
  const getPagesByWorkspaceId = async ({
    id,
  }: useMutatePagesByWorkspaceIdPros) => {
    const response: UseMutationResult<IPage[]> = await api.get(
      `/pages/workspace/${id}`
    )
    return response.data as IPage[]
  }

  return useMutation({
    mutationKey: ["getPagesByWorkspaceId"],
    mutationFn: getPagesByWorkspaceId,
  })
}
