import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import EditTemplate from "../../../../../layouts/main/EditTemplate/EditTemplate"
import { api } from "../../../../../services/api"
import { useTemplateBySlugAndPageSlug } from "../../../../../services/hooks/useTemplate/useTemplateByUrlAndPageUrl"
import { useUpdateTemplate } from "../../../../../services/hooks/useTemplate/useUpdateTemplate"
import {
  getTemplateBySlugAndPageSlugProps,
  IUpdateTemplate,
} from "../../../../../types/Template.type"
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

  const updateTemplate = useUpdateTemplate()

  const handleUpdateTemplate = (data: IUpdateTemplate) => {
    updateTemplate.mutate({
      id: getPageAndTemplate.data.id as string,
      data: {
        ...data,
      },
    })
  }

  return (
    <EditTemplate
      initialTemplateData={getPageAndTemplate.data}
      initialPageData={getPageAndTemplate.data.Page}
      handleUpdateTemplate={handleUpdateTemplate}
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
