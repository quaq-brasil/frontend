import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import ConsumerPage from "../../layouts/main/ConsumerPage/ConsumerPage"
import { api } from "../../services/api"
import { usePageBySlug } from "../../services/hooks/usePage/usePageBySlug"
import { IPage } from "../../types/Page.type"
import { RedirectNotFoundVerify } from "../../utils/404Redirect"

type ConsumerPagePageProps = {
  pageSlug: string
  pageData: IPage
}

export default function ConsumerPagePage({
  pageSlug,
  pageData,
}: ConsumerPagePageProps) {
  const getPage = usePageBySlug({
    slug: pageSlug,
    options: {
      initialData: pageData,
    },
  })

  return (
    <ConsumerPage
      initialPageData={getPage.data}
      initialTemplatesData={getPage?.data?.templates || []}
    />
  )
}

type Params = {
  page: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  async function getPage() {
    const { page } = ctx.params as Params

    const { data } = await api.get(`/pages/slug/${page}`)

    return {
      pageData: { data },
      pageSlug: page,
    }
  }

  return await RedirectNotFoundVerify(getPage, ctx)
}
