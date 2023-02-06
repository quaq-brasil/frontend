import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import TemplateExecution from "../../../layouts/main/TemplateExecution/TemplateExecution"
import { useTemplateByUrlAndPageUrl } from "../../../services/hooks/useTemplate/useTemplateByUrlAndPageUrl"

type TemplateExecutionPageProps = {
  page: string
  template: string
}

export default function TemplateExecutionPage({
  page,
  template,
}: TemplateExecutionPageProps) {
  const getTemplateAndPage = useTemplateByUrlAndPageUrl({
    url: template,
    page_url: page,
  })

  return <TemplateExecution initialData={getTemplateAndPage?.data} />
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
