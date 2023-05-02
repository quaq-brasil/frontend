import { InteractionLog } from "layouts/main/InteractionLog/InteractionLog"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { api } from "services/api"
import { useTemplateBySlugAndPageSlug } from "services/hooks/useTemplate/useTemplateByUrlAndPageUrl"
import { getTemplateBySlugAndPageSlugProps } from "types/Template.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

type TemplateLogsProps = {
  pageAndTemplateData: getTemplateBySlugAndPageSlugProps
  pageSlug: string
  templateSlug: string
}

export default function TemplateLogs({
  pageAndTemplateData,
  pageSlug,
  templateSlug,
}: TemplateLogsProps) {
  const getPageAndTemplate = useTemplateBySlugAndPageSlug({
    slug: templateSlug,
    page_slug: pageSlug,
    options: {
      initialData: pageAndTemplateData,
    },
  })

  type PageAndTemplateProps = {
    templateTitle: string
    pageTitle: string
    pageDescription: string
  }

  const [pageInfo, setPageInfo] = useState<PageAndTemplateProps | null>(null)

  useEffect(() => {
    if (getPageAndTemplate) {
      const {
        data: {
          Page: { title: pageTitle, description: pageDescription },
          title: templateTitle,
        },
      } = getPageAndTemplate

      setPageInfo({
        pageTitle:
          pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1).toLowerCase(),
        templateTitle:
          templateTitle.charAt(0).toUpperCase() +
          templateTitle.slice(1).toLowerCase(),
        pageDescription,
      })
    }
  }, [getPageAndTemplate])

  return (
    <>
      <Head>
        <title>{`${pageInfo?.pageTitle} - ${pageInfo?.templateTitle}`}</title>
        <meta name="description" content={pageInfo?.pageDescription} />
      </Head>
      <InteractionLog
        initialPageData={getPageAndTemplate?.data?.Page}
        initialTemplateData={getPageAndTemplate?.data}
      />
    </>
  )
}

type Params = {
  page: string
  template: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: { params: Params }, cookies: any, payload: any) => {
    const { page, template } = ctx.params

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

    return await RedirectNotFoundVerify({
      func: getPageAndTemplate,
      ctx,
      cookies,
      payload,
    })
  }
)
