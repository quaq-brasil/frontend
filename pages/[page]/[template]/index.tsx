import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import TemplateExecution from "../../../layouts/main/TemplateExecution/TemplateExecution"
import { api } from "../../../services/api"
import { useTemplateBySlugAndPageSlug } from "../../../services/hooks/useTemplate/useTemplateByUrlAndPageUrl"
import { getTemplateBySlugAndPageSlugProps } from "../../../types/Template.type"
import { RedirectNotFoundVerify } from "../../../utils/404Redirect"

type TemplateExecutionPageProps = {
  pageSlug: string
  templateSlug: string
  pageAndTemplateData: getTemplateBySlugAndPageSlugProps
}

export default function TemplateExecutionPage({
  pageSlug,
  templateSlug,
  pageAndTemplateData,
}: TemplateExecutionPageProps) {
  const getTemplateAndPage = useTemplateBySlugAndPageSlug({
    slug: templateSlug,
    page_slug: pageSlug,
    options: {
      initialData: pageAndTemplateData,
    },
  })

  return <TemplateExecution initialData={getTemplateAndPage.data} />
}

type Params = {
  page: string
  template: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  async function getPageAndTemplate() {
    const { page, template } = ctx.params as Params

    const { data } = await api.get(`/templates/${page}/${template}`)

    return {
      pageSlug: page,
      templateSlug: template,
      pageAndTemplateData: { data },
    }
  }

  return await RedirectNotFoundVerify(getPageAndTemplate, ctx)
}
