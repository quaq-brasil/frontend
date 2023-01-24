import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { gql, request } from "graphql-request"
import { useMutationProps } from "../../../types/useQueryProps"
import { IPublication } from "./../../../types/Publication.type"

const mutationDocument = gql`
  mutation {
    publication {
      data {
        title
        blocks
        template_id
        page_id
      }
    }
  }
`

const endpoint = `${process.env.API_HOST}/publication`

export function useCreatePublication({
  options,
}: useMutationProps): UseMutationResult<IPublication, unknown> | any {
  return useMutation({
    mutationKey: ["createPublication"],
    mutationFn: async (body) => {
      return request(endpoint, { mutationDocument, body })
    },
    ...options,
  })
}
