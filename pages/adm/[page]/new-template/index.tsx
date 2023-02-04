import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import CreateTemplate from "../../../../layouts/main/CreateTemplate/CreateTemplate"
import { usePageByUrl } from "../../../../services/hooks/usePage/usePageByUrl"

type CreateTemplatePageProps = {
  page: string
}

export default function CreateTemplatePage({ page }: CreateTemplatePageProps) {
  const pageResponse = usePageByUrl({ url: page })

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
