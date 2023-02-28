import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import InteractionLog from "../../../../../layouts/main/InteractionLog/InteractionLog"
import { api } from "../../../../../services/api"
import { useTemplateBySlugAndPageSlug } from "../../../../../services/hooks/useTemplate/useTemplateByUrlAndPageUrl"
import { getTemplateBySlugAndPageSlugProps } from "../../../../../types/Template.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../../../utils/404Redirect"
import { withAuth } from "../../../../../utils/withAuth"

type TemplateLogsProps = {
  data: getTemplateBySlugAndPageSlugProps
  pageSlug: string
  templateSlug: string
}

export default function TemplateLogs({
  data,
  pageSlug,
  templateSlug,
}: TemplateLogsProps) {
  const getPageAndTemplate = useTemplateBySlugAndPageSlug({
    slug: templateSlug,
    page_slug: pageSlug,
    options: {
      initialData: data,
    },
  })

  return (
    <InteractionLog
      initialPageData={getPageAndTemplate.data.Page}
      initialTemplateData={getPageAndTemplate.data}
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
