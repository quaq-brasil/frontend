import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import PageDelete from "../../../../layouts/main/PageDelete/PageDelete"
import { api } from "../../../../services/api"
import { useDeletePage } from "../../../../services/hooks/usePage/useDeletePage"
import { usePageBySlug } from "../../../../services/hooks/usePage/usePageBySlug"
import { IUserPayload } from "../../../../types/Auth.types"
import { IPage } from "../../../../types/Page.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../../utils/404Redirect"
import { pageUrls } from "../../../../utils/pagesUrl"
import { withAuth } from "../../../../utils/withAuth"

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

  return (
    <PageDelete
      initialPageData={getPage.data}
      initialUserData={payload}
      handleDeletePage={handleDeletePage}
    />
  )
}

type Params = {
  pageSlug: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    const { pageSlug } = ctx.params as Params

    async function getPage({ cookies }: redirectNotFoundVerifyProps) {
      const { data: pageData } = await api.get(`/pages/slug/${pageSlug}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return {
        pageData,
        payload,
        pageSlug,
      }
    }

    return await RedirectNotFoundVerify(getPage, ctx, cookies, payload)
  }
)
