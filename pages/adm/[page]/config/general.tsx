import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import GeneralSettings from "../../../../layouts/main/GeneralSettings/GeneralSettings"
import { api } from "../../../../services/api"
import { usePageBySlug } from "../../../../services/hooks/usePage/usePageBySlug"
import { useUpdatePage } from "../../../../services/hooks/usePage/useUpdatePage"
import { IPage, IUpdatePage } from "../../../../types/Page.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../../utils/404Redirect"
import { pageUrls } from "../../../../utils/pagesUrl"
import { withAuth } from "../../../../utils/withAuth"

type GeneralSettingsPageProps = {
  pageSlug: string
  pageData: IPage
}

export default function GeneralSettingsPage({
  pageData,
  pageSlug,
}: GeneralSettingsPageProps) {
  const router = useRouter()

  const getPage = usePageBySlug({
    slug: pageSlug,
    options: {
      initialData: pageData,
    },
  })

  const updatePage = useUpdatePage()

  function handleUpdatePage(data: IUpdatePage) {
    updatePage.mutate(
      {
        id: getPage.data.id,
        data: {
          ...data,
        },
      },
      {
        onSuccess: (data) => {
          router.push(
            pageUrls.pageSettings({
              pageSlug: data.slug,
              pageSettings: "general",
            })
          )
        },
      }
    )
  }

  return (
    <GeneralSettings
      initialPageData={getPage.data}
      handleUpdatePage={handleUpdatePage}
    />
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
        pageData: { data },
        payload,
        pageSlug: page,
      }
    }

    return await RedirectNotFoundVerify(getPage, ctx, cookies, payload)
  }
)
