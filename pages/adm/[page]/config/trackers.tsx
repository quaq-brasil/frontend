import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import PageTrackers from "../../../../layouts/main/PageTrackers/PageTrackers"
import { api } from "../../../../services/api"
import { usePageBySlug } from "../../../../services/hooks/usePage/usePageBySlug"
import { useUpdatePage } from "../../../../services/hooks/usePage/useUpdatePage"
import { IPage, IUpdatePage } from "../../../../types/Page.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../../utils/404Redirect"
import { withAuth } from "../../../../utils/withAuth"

type PageTrackersPageProps = {
  pageSlug: string
  pageData: IPage
}

export default function PageTrackersPage({
  pageData,
  pageSlug,
}: PageTrackersPageProps) {
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

  return (
    <PageTrackers
      handleUpdateTrackers={handleUpdateTrackers}
      initialPageData={getPage?.data}
    />
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

    return await RedirectNotFoundVerify(getPage, ctx, cookies, payload)
  }
)
