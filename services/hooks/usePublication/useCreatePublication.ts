import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../api"
import { IPublication } from "./../../../types/Publication.type"

type useCreatePublicationProps = {
  data: IPublication
} & useMutationProps

export const useCreatePublication = () => {
  const createPublication = async ({ data }: useCreatePublicationProps) => {
    const response: UseMutationResult<IPublication> = await api.post(
      `/publications`,
      data
    )

    return response.data as IPublication
  }

  return useMutation({
    mutationKey: ["createPublication"],
    mutationFn: createPublication,
  })
}
