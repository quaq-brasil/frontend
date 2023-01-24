import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { gql, request } from "graphql-request"
import { useQueryProps } from "../../../types/useQueryProps"
import { ITemplate } from "./../../../types/Template.type"

const queryDocument = gql`
  query {
    template {
      data {
        name
        url
        shortcut_image
        shortcut_size
        current_publication_id
        number_of_new_interactions
        facebook_pixel_id
        page_id
      }
    }
  }
`

const endpoint = `${process.env.API_HOST}/template`

type useGetTemplatesByPageIdProps = {
  id: string
} & useQueryProps

export function useGetTemplatesByPageId({
  id,
  options,
}: useGetTemplatesByPageIdProps): UseQueryResult<ITemplate, unknown> | any {
  const endpointWithParams = `${endpoint}/page/${id}`

  return useQuery({
    queryKey: ["getTemplateById", id],
    queryFn: async () => {
      const {
        posts: { data },
      } = await request(endpointWithParams, queryDocument)
      return data
    },
    ...options,
  })
}
