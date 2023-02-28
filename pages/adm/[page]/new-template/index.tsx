import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import CreateTemplate from "../../../../layouts/main/CreateTemplate/CreateTemplate"
import { api } from "../../../../services/api"
import { usePageBySlug } from "../../../../services/hooks/usePage/usePageBySlug"
import { IPage } from "../../../../types/Page.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../../utils/404Redirect"
import { withAuth } from "../../../../utils/withAuth"

type CreateTemplatePageProps = {
  pageSlug: string
  pageData: IPage
}

export default function CreateTemplatePage({
  pageData,
  pageSlug,
}: CreateTemplatePageProps) {
  const getPage = usePageBySlug({
    slug: pageSlug,
    options: { initialData: pageData },
  })

  return <CreateTemplate page={getPage.data} />
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
      }
    }

    return await RedirectNotFoundVerify(getPage, ctx, cookies, payload)
  }
)
