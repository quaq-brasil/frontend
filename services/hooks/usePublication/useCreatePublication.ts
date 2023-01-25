import { useMutation } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../apiClient"
import { IPublication } from "./../../../types/Publication.type"

type useCreatePublicationProps = {
  data: IPublication
} & useMutationProps

export const useCreatePublication = () => {
  const createPublication = async ({ data }: useCreatePublicationProps) => {
    await api.post(`/publication`, data)
  }

  return useMutation({
    mutationKey: ["createPublication"],
    mutationFn: createPublication,
  })
}
