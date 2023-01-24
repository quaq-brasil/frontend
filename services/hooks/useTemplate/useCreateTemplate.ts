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

export function useCreateTemplate({
  options,
}: useMutationProps): UseMutationResult<ITemplate, unknown> | any {
  return useMutation({
    mutationKey: ["templateCreation"],
    mutationFn: async (body) => {
      // Como tipar body do request?
      return request(endpoint, { mutationDocument, body })
    },
    ...options,
  })
}
