import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { useMutationProps } from "../../../types/useQueryProps"
import {
  IVariableRequest,
  IVariableResponse,
} from "../../../types/Variables.types"
import { api } from "../../apiClient"

type useMutateVariablesProps = {
  data: IVariableRequest
} & useMutationProps

export const useMutateVariables = () => {
  const getVariables = async ({ data }: useMutateVariablesProps) => {
    const response: UseMutationResult<IVariableResponse> = await api.post(
      `/variables`,
      {
        ...data,
      }
    )

    return response.data as IVariableResponse
  }

  return useMutation({
    mutationKey: ["getVariables"],
    mutationFn: getVariables,
  })
}
