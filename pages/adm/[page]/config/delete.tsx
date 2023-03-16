import { PageDelete } from "layouts/main/PageDelete/PageDelete"
import { GetServerSideProps } from "next"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { api } from "services/api"
import { useDeletePage } from "services/hooks/usePage/useDeletePage"
import { usePageBySlug } from "services/hooks/usePage/usePageBySlug"
import { IUserPayload } from "types/Auth.types"
import { IPage } from "types/Page.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { pageUrls } from "utils/pagesUrl"
import { withAuth } from "utils/withAuth"

type PageDeletePageProps = {
  payload: IUserPayload
  pageSlug: string
  pageData: IPage
}

export default function PageDeletePage({
  payload,
  pageData,
  pageSlug,
}: PageDeletePageProps) {
  const text = useTranslation().t

  const getPage = usePageBySlug({
    slug: pageSlug,
    options: {
      initialData: pageData,
    },
  })

  const deletePage = useDeletePage()

  const router = useRouter()

  function handleDeletePage() {
    deletePage.mutate(
      { id: getPage.data.id },
      {
        onSuccess: () => {
          router.push(pageUrls.home())
        },
      }
    )
  }

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
        <title>{`${pageTitle} - ${text("pagedelete:pagetitle")}`}</title>
        <meta
          name="description"
          content={`${text("pagedelete:pagedescription")}`}
        />
      </Head>
      <PageDelete
        initialPageData={getPage.data}
        initialUserData={payload}
        handleDeletePage={handleDeletePage}
      />
    </>
  )
}

type Params = {
  page: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: { params: Params }, cookies: any, payload: any) => {
    const { page } = ctx.params as Params

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

    return await RedirectNotFoundVerify(getPage, ctx, cookies, payload)
  }
)
