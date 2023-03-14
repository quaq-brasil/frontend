import { EditPublication } from "layouts/main/EditPublication/EditPublication"
import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { api } from "services/api"
import { useTemplateBySlugAndPageSlug } from "services/hooks/useTemplate/useTemplateByUrlAndPageUrl"
import { getTemplateBySlugAndPageSlugProps } from "types/Template.type"

import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

type EditTemplatePageProps = {
  pageAndTemplateData: getTemplateBySlugAndPageSlugProps
  pageSlug: string
  templateSlug: string
}

export default function EditTemplatePage({
  pageAndTemplateData,
  pageSlug,
  templateSlug,
}: EditTemplatePageProps) {
  const getPageAndTemplate = useTemplateBySlugAndPageSlug({
    slug: templateSlug,
    page_slug: pageSlug,
    options: {
      initialData: pageAndTemplateData,
    },
  })

  return (
    <EditPublication
      initialPageData={getPageAndTemplate.data.Page}
      initialTemplateData={getPageAndTemplate.data}
    />
  )
}

type Params = {
  page: string
  template: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: { params: Params }, cookies: any, payload: any) => {
    const { page, template } = ctx.params as Params

    async function getPageAndTemplate({
      cookies,
    }: redirectNotFoundVerifyProps) {
      const { data } = await api.get(`/templates/${page}/${template}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return {
        pageSlug: page,
        templateSlug: template,
        pageAndTemplateData: { data },
      }
    }

    return await RedirectNotFoundVerify(
      getPageAndTemplate,
      ctx,
      cookies,
      payload
    )
  }
)
