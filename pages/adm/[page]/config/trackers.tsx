import { PageTrackers } from "layouts/main/PageTrackers/PageTrackers"
import { GetServerSideProps } from "next"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { api } from "services/api"
import { usePageBySlug } from "services/hooks/usePage/usePageBySlug"
import { useUpdatePage } from "services/hooks/usePage/useUpdatePage"
import { IPage, IUpdatePage } from "types/Page.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

type PageTrackersPageProps = {
  pageSlug: string
  pageData: IPage
}

export default function PageTrackersPage({
  pageData,
  pageSlug,
}: PageTrackersPageProps) {
  const text = useTranslation().t

  const getPage = usePageBySlug({
    slug: pageSlug,
    options: { initialData: pageData },
  })

  const pageUpdate = useUpdatePage()

  function handleUpdateTrackers(data: IUpdatePage) {
    pageUpdate.mutate({
      id: getPage.data.id,
      data: {
        trackers: data.trackers,
      },
    })
  }

  const [pageTitle, setPageTitle] = useState<string | null>(null)

  useEffect(() => {
    if (getPage) {
      let pageTitle =
        getPage?.data?.title.charAt(0).toUpperCase() +
        getPage?.data?.title.slice(1).toLowerCase()

      setPageTitle(pageTitle)
    }
  }, [getPage])

  return (
    <>
      <Head>
        <title>{`${pageTitle} - ${text("pagetrackers:pagetitle")}`}</title>
        <meta
          name="description"
          content={`${text("pagetrackers:pagedescription")}`}
        />
      </Head>
      <PageTrackers
        handleUpdateTrackers={handleUpdateTrackers}
        initialPageData={getPage?.data}
      />
    </>
  )
}

type Params = {
  page: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: { params: Params }, cookies: any, payload: any) => {
    const { page } = ctx.params

    async function getPage({ cookies }: redirectNotFoundVerifyProps) {
      const { data } = await api.get(`/pages/slug/${page}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return {
        pageData: { data },
        payload,
        pageSlug: page,
      }
    }

    return await RedirectNotFoundVerify({
      func: getPage,
      ctx,
      cookies,
      payload,
    })
  }
)
