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

export function useExample({
  options,
}: useQueryProps): UseQueryResult<IExample, unknown> | any {
  return useQuery({
    queryKey: ["example", endpoint, queryDocument],
    queryFn: async () => {
      const {
        posts: { data },
      } = await request(endpoint, queryDocument)
      return data
    },
    ...options,
  })
}
