import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { gql, request } from "graphql-request"
import { ITemplate } from "../../../types/Template.type"
import { useMutationProps } from "../../../types/useQueryProps"

const mutationDocument = gql`
  mutation {
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

type useUpdateTemplateProps = {
  id: string
} & useMutationProps

export function useUpdateTemplate({
  options,
  id,
}: useUpdateTemplateProps): UseMutationResult<ITemplate, unknown> | any {
  const endpointWithParams = `${endpoint}/${id}`

  return useMutation({
    mutationKey: ["updateTemplate", id],
    mutationFn: async (body) => {
      return request(endpoint, { mutationDocument, body })
    },
    ...options,
  })
}
