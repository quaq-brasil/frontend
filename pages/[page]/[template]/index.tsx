import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import TemplateExecution from "../../../layouts/main/TemplateExecution/TemplateExecution"
import { usePageByUrl } from "../../../services/hooks/usePage/usePageByUrl"
import { useTemplateByUrl } from "../../../services/hooks/useTemplate/useTemplateByUrl"

type TemplateExecutionPageProps = {
  page: string
  template: string
}

export default function TemplateExecutionPage({
  page,
  template,
}: TemplateExecutionPageProps) {
  const getPage = usePageByUrl({ url: page })

  const getTemplate = useTemplateByUrl({
    url: template,
  })

  return (
    <TemplateExecution
      initialPageData={getPage?.data}
      initialTemplateData={getTemplate?.data}
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
