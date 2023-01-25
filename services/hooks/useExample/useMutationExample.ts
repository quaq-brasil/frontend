import { useMutation } from "@tanstack/react-query"
import { IExample } from "../../../types/Example.type"
import { useMutationProps } from "../../../types/useQueryProps"
import { api } from "../../api"

type useUpdateExampleProps = {
  id: string
} & useMutationProps &
  IExample

export const useUpdateExample = ({
  id,
  name,
  options,
}: useUpdateExampleProps) => {
  const updateExample = async () => {
    await api.put(`/example/${id}`, { name })
  }

  return useMutation({
    mutationKey: ["example", id],
    mutationFn: updateExample,
    ...options,
  })
}
