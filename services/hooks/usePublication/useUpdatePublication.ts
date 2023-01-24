import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { gql, request } from "graphql-request"
import { ITemplate } from "../../../types/Template.type"
import { useMutationProps } from "../../../types/useQueryProps"

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

type useUpdatePublicationProps = {
  id: string
} & useMutationProps

export function useUpdatePublication({
  options,
  id,
}: useUpdatePublicationProps): UseMutationResult<ITemplate, unknown> | any {
  const endpointWithParams = `${endpoint}/${id}`

  return useMutation({
    mutationKey: ["updatePublication", id],
    mutationFn: async (body) => {
      return request(endpoint, { mutationDocument, body })
    },
    ...options,
  })
}
