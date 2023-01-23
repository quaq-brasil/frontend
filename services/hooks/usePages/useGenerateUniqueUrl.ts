import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query"
import { gql, request } from "graphql-request"
import { IExample } from "../../../types/Example.type"
import { useQueryProps } from "../../../types/useQueryProps"

const queryDocument = gql`
  mutation {
    url {
      data {
        uniqueurl
      }
    }
  }
`

const endpoint = `${process.env.API_HOST}/page/url`

type useExampleByUrlProps = {
  url: string
} & useQueryProps

export function useExampleByUrl({
  url,
  options,
}: useExampleByUrlProps): UseQueryResult<IExample, unknown> | any {
  const endpointWithParams = `${endpoint}/${url}`

  return useMutation({
    queryKey: ["url"],
    queryFn: async () => {
      const {
        posts: { data },
      } = await request(endpointWithParams, queryDocument, data: {
        url,
      })
      return data
    },
    ...options,
  })
}
