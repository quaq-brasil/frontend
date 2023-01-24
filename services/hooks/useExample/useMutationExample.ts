import { useMutation, UseQueryResult } from "@tanstack/react-query"
import { gql, request } from "graphql-request"
import { IExample } from "../../../types/Example.type"
import { useMutationProps } from "../../../types/useQueryProps"

const mutationDocument = gql`
  mutation {
    posts {
      data {
        id
        title
      }
    }
  }
`

const endpoint = `${process.env.API_HOST}/example`

type useExampleByUrlProps = {
  url: string
} & useMutationProps

export function useExampleByUrl({
  url,
  options,
}: useExampleByUrlProps): UseQueryResult<IExample, unknown> | any {
  const endpointWithParams = `${endpoint}/url:${url}`

  return useMutation({
    mutationKey: ["ok"],
    mutationFn: async (body) => {
      return request(endpointWithParams, { mutationDocument, body })
    },
    ...options,
  })
}
