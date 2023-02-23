import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import ConsumerPage from "../../layouts/main/ConsumerPage/ConsumerPage"
import { usePageBySlug } from "../../services/hooks/usePage/usePageBySlug"
import { IPage } from "../../types/Page.type"

type ConsumerPagePageProps = {
  page: string
}

export default function ConsumerPagePage({ page }: ConsumerPagePageProps) {
  const getPage = usePageBySlug({
    slug: page,
  })

  return (
    <ConsumerPage
      initialPageData={getPage?.data as IPage}
      initialTemplatesData={getPage?.data?.templates || []}
    />
  )
}

type Params = {
  page: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { page } = params as Params

  return {
    props: {
      page,
    },
  }
}
