import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { EditPublication } from "../../../../../layouts/main/EditPublication/EditPublication"
import { api } from "../../../../../services/api"
import { useTemplateByUrlAndPageUrl } from "../../../../../services/hooks/useTemplate/useTemplateByUrlAndPageUrl"
import { getTemplateByUrlAndPageUrlProps } from "../../../../../types/Template.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../../../utils/404Redirect"
import { withAuth } from "../../../../../utils/withAuth"

type EditTemplatePageProps = {
  data: getTemplateByUrlAndPageUrlProps
  pageSlug: string
  templateSlug: string
}

export default function EditTemplatePage({
  data,
  pageSlug,
  templateSlug,
}: EditTemplatePageProps) {
  const getTemplateAndPage = useTemplateByUrlAndPageUrl({
    url: templateSlug,
    page_url: pageSlug,
    options: {
      initialData: data,
    },
  })

  return (
    <EditPublication
      page={getTemplateAndPage?.data.Page}
      template={getTemplateAndPage?.data}
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
