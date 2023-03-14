import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { api } from "services/api"
import { IPublication, IUpdatePublication } from "types/Publication.type"

type useUpdatePublicationPros = {
  id: string
  data: IUpdatePublication
}

export const useUpdatePublication = () => {
  const updatePublication = async ({ id, data }: useUpdatePublicationPros) => {
    const response: UseMutationResult<IPublication> = await api.put(
      `/publications/${id}`,
      data
    )
    return response.data as IPublication
  }

  return useMutation({
    mutationKey: ["updatePublication"],
    mutationFn: updatePublication,
  })
}
