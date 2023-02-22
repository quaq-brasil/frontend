import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import CreateTemplate from "../../../../layouts/main/CreateTemplate/CreateTemplate"
import { usePageBySlug } from "../../../../services/hooks/usePage/usePageBySlug"

type CreateTemplatePageProps = {
  page: string
}

export default function CreateTemplatePage({ page }: CreateTemplatePageProps) {
  const pageResponse = usePageBySlug({ slug: page })

  return <CreateTemplate page={pageResponse?.data} />
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
