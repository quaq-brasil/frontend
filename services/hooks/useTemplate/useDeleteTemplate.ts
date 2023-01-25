import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { gql, request } from "graphql-request"
import { ITemplate } from "../../../types/Template.type"
import { useMutationProps } from "../../../types/useQueryProps"

const mutationDocument = gql``

const endpoint = `${process.env.API_HOST}/template`

type useDeleteTemplateProps = {
  id: string
} & useMutationProps

export function useDeleteTemplate({
  options,
  id,
}: useDeleteTemplateProps): UseMutationResult<ITemplate, unknown> | any {
  const endpointWithParams = `${endpoint}/${id}`

  return useMutation({
    mutationKey: ["templateCreation"],
    mutationFn: async (body) => {
      return request(endpointWithParams, { mutationDocument, body })
    },
    ...options,
  })
}
