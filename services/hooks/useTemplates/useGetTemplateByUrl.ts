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

type useGetTemplateByUrlProps = {
  url: string
} & useQueryProps

export function useGetTemplateByUrl({
  url,
  options,
}: useGetTemplateByUrlProps): UseQueryResult<ITemplate, unknown> | any {
  const endpointWithParams = `${endpoint}/url/${url}`

  return useQuery({
    queryKey: ["getTemplateByUrl", url],
    queryFn: async () => {
      const {
        posts: { data },
      } = await request(endpointWithParams, queryDocument)
      return data
    },
    ...options,
  })
}
