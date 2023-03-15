import { CreateTemplate } from "layouts/main/CreateTemplate/CreateTemplate"
import { GetServerSideProps } from "next"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { api } from "services/api"
import { usePageBySlug } from "services/hooks/usePage/usePageBySlug"
import { IPage } from "types/Page.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

type CreateTemplatePageProps = {
  pageSlug: string
  pageData: IPage
}

export default function CreateTemplatePage({
  pageData,
  pageSlug,
}: CreateTemplatePageProps) {
  const text = useTranslation().t

  const getPage = usePageBySlug({
    slug: pageSlug,
    options: { initialData: pageData },
  })

  const [pageTitle, setPageTitle] = useState<string | null>(null)

  useEffect(() => {
    if (getPage) {
      let pageTitle =
        getPage.data.title.charAt(0).toUpperCase() +
        getPage.data.title.slice(1).toLowerCase()

      setPageTitle(pageTitle)
    }
  }, [getPage])

  return (
    <>
      <Head>
        <title>{`${pageTitle} - ${text("createtemplate:pagetitle")}`}</title>
        <meta
          name="description"
          content={`${pageTitle} - ${text("createtemplate:pagedescription")}`}
        />
      </Head>
      <CreateTemplate initialPageData={getPage.data} />
    </>
  )
}

type Params = {
  page: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    const { page } = ctx.params as Params

    async function getPage({ cookies }: redirectNotFoundVerifyProps) {
      const { data } = await api.get(`/pages/slug/${page}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return {
        pageSlug: page,
        pageData: { data },
        payload,
      }
    }

    return await RedirectNotFoundVerify(getPage, ctx, cookies, payload)
  }
)
