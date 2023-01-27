import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IPublication } from "./../../../types/Publication.type"

type useUpdatePublicationProps = {
  id: string
  data: IPublication
} & useMutationProps

export const useUpdatePublication = ({
  id,
  data,
  options,
}: useUpdatePublicationProps) => {
  const updatePublication = async () => {
    await api.put(`/publications/${id}`, { data })
  }

  return useMutation({
    mutationKey: ["updatePublication", id],
    mutationFn: updatePublication,
    ...options,
  })
}
