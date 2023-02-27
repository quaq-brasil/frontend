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
  page: string
  template: string
}

export default function EditTemplatePage({
  data,
  page,
  template,
}: EditTemplatePageProps) {
  const getTemplateAndPage = useTemplateByUrlAndPageUrl({
    url: template,
    page_url: page,
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
  page: string
  template: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    const { page, template } = ctx.params as Params

    async function getTemplate({ cookies }: redirectNotFoundVerifyProps) {
      const { data } = await api.get(`/templates/${page}/${template}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return {
        page: page,
        template: template,
        data,
      }
    }

    return await RedirectNotFoundVerify(getTemplate, ctx, cookies, payload)
  }
)
