import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { gql, request } from "graphql-request"
import { useQueryProps } from "../../../types/useQueryProps"
import { IPublication } from "./../../../types/Publication.type"

const queryDocument = gql`
  query {
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

type usePublicationByIdProps = {
  id: string
} & useQueryProps

export function usePublicationById({
  id,
  options,
}: usePublicationByIdProps): UseQueryResult<IPublication, unknown> | any {
  const endpointWithParams = `${endpoint}/page/${id}`

  return useQuery({
    queryKey: ["getPublicationsByPageId", id],
    queryFn: async () => {
      const {
        posts: { data },
      } = await request(endpointWithParams, queryDocument)
      return data
    },
    ...options,
  })
}
