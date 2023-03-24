import { CentralStats } from "layouts/main/CentralStats/CentralStats"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { api } from "services/api"
import { useTemplateBySlugAndPageSlug } from "services/hooks/useTemplate/useTemplateByUrlAndPageUrl"
import { IUserPayload } from "types/Auth.types"
import { getTemplateBySlugAndPageSlugProps } from "types/Template.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

type TemplateAccessControlPageProps = {
  pageSlug: string
  templateSlug: string
  pageAndTemplateData: getTemplateBySlugAndPageSlugProps
  payload: IUserPayload
}

export default function TemplateAccessControlPage({
  pageSlug,
  templateSlug,
  payload,
  pageAndTemplateData,
}: TemplateAccessControlPageProps) {
  const getPageAndTemplate = useTemplateBySlugAndPageSlug({
    page_slug: pageSlug,
    slug: templateSlug,
    options: { initialData: pageAndTemplateData },
  })

  type PageAndTemplateProps = {
    templateTitle: string
    pageTitle: string
    pageDescription: string
  }

  const [pageInfo, setPageInfo] = useState<PageAndTemplateProps | null>(null)

  useEffect(() => {
    if (getPageAndTemplate) {
      let pageTitle =
        getPageAndTemplate.data.Page.title.charAt(0).toUpperCase() +
        getPageAndTemplate.data.Page.title.slice(1).toLowerCase()

      let templateTitle =
        getPageAndTemplate.data.title.charAt(0).toUpperCase() +
        getPageAndTemplate.data.title.slice(1).toLowerCase()

      setPageInfo({
        pageTitle: pageTitle,
        templateTitle: templateTitle,
        pageDescription: getPageAndTemplate.data.Page.description,
      })
    }
  }, [getPageAndTemplate])

  return (
    <>
      <Head>
        <title>{`${pageInfo?.pageTitle} - ${pageInfo?.templateTitle}`}</title>
        <meta name="description" content={pageInfo?.pageDescription} />
      </Head>
      <CentralStats
        initialPageData={getPageAndTemplate.data.Page}
        initialTemplateData={getPageAndTemplate.data}
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
        payload,
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