import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { gql, request } from "graphql-request"
import { IExample } from "../../../types/Example.type"
import { useQueryProps } from "../../../types/useQueryProps"

const queryDocument = gql`
  query {
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
} & useQueryProps

export function useExampleByUrl({
  url,
  options,
}: useExampleByUrlProps): UseQueryResult<IExample, unknown> | any {
  const endpointWithParams = `${endpoint}/url:${url}`

  return useQuery({
    queryKey: ["example"],
    queryFn: async () => {
      const {
        posts: { data },
      } = await request(endpointWithParams, queryDocument)
      return data
    },
    ...options,
  })
}
