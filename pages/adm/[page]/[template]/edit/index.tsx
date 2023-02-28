import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { EditPublication } from "../../../../../layouts/main/EditPublication/EditPublication"
import { api } from "../../../../../services/api"
import { useTemplateBySlugAndPageSlug } from "../../../../../services/hooks/useTemplate/useTemplateByUrlAndPageUrl"
import { getTemplateBySlugAndPageSlugProps } from "../../../../../types/Template.type"

import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../../../utils/404Redirect"
import { withAuth } from "../../../../../utils/withAuth"

type EditTemplatePageProps = {
  data: getTemplateBySlugAndPageSlugProps
  pageSlug: string
  templateSlug: string
}

export default function EditTemplatePage({
  data,
  pageSlug,
  templateSlug,
}: EditTemplatePageProps) {
  const getPageAndTemplate = useTemplateBySlugAndPageSlug({
    slug: templateSlug,
    page_slug: pageSlug,
    options: {
      initialData: data,
    },
  })

  return (
    <EditPublication
      page={getPageAndTemplate.data.Page}
      template={getPageAndTemplate.data}
    />
  )
}

type Params = {
  pageSlug: string
  templateSlug: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    const { pageSlug, templateSlug } = ctx.params as Params

    async function getTemplate({ cookies }: redirectNotFoundVerifyProps) {
      const { data } = await api.get(`/templates/${pageSlug}/${templateSlug}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return {
        pageSlug: pageSlug,
        templateSlug: templateSlug,
        data,
      }
    }

    return await RedirectNotFoundVerify(getTemplate, ctx, cookies, payload)
  }
)
