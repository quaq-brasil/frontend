import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { EditPublication } from "../../../../../layouts/main/EditPublication/EditPublication"
import { useTemplateByUrlAndPageUrl } from "../../../../../services/hooks/useTemplate/useTemplateByUrlAndPageUrl"

type EditTemplatePageProps = {
  page: string
  template: string
}

export default function EditTemplatePage({
  page,
  template,
}: EditTemplatePageProps) {
  const getTemplateAndPage = useTemplateByUrlAndPageUrl({
    url: template,
    page_url: page,
  })

  return (
    <EditPublication
      page={getTemplateAndPage?.data.Page}
      template={getTemplateAndPage?.data}
    />
  )
}

type Params = {
  page: string
  template: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { page, template } = params as Params

  return {
    props: {
      page,
      template,
    },
  }
}
