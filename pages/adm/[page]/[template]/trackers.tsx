import { CentralTrackers } from "layouts/main/CentralTrackers/CentralTrackers"
import { GetServerSideProps } from "next"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { api } from "services/api"
import { useTemplateBySlugAndPageSlug } from "services/hooks/useTemplate/useTemplateByUrlAndPageUrl"
import { useUpdateTemplate } from "services/hooks/useTemplate/useUpdateTemplate"
import { IUserPayload } from "types/Auth.types"
import {
  getTemplateBySlugAndPageSlugProps,
  IUpdateTemplate,
} from "types/Template.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

type CentralTrackersPageProps = {
  pageSlug: string
  templateSlug: string
  pageAndTemplateData: getTemplateBySlugAndPageSlugProps
  payload: IUserPayload
}

export default function CentralTrackersPage({
  pageSlug,
  templateSlug,
  payload,
  pageAndTemplateData,
}: CentralTrackersPageProps) {
  const text = useTranslation().t

  const getPageAndTemplate = useTemplateBySlugAndPageSlug({
    page_slug: pageSlug,
    slug: templateSlug,
    consumer_id: payload.sub,
    options: { initialData: pageAndTemplateData },
  })

  const templateUpdate = useUpdateTemplate()

  function handleUpdateTrackers(data: IUpdateTemplate) {
    templateUpdate.mutate({
      id: getPageAndTemplate.data.id,
      data: {
        trackers: data.trackers,
      },
    })
  }

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
        <meta name="description" content={pageInfo.pageDescription} />
      </Head>
      <CentralTrackers
        handleUpdateTrackers={handleUpdateTrackers}
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
  async (ctx: any, cookies: any, payload: any) => {
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
        payload,
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
