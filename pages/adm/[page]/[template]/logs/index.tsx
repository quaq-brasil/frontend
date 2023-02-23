import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import InteractionLog from "../../../../../layouts/main/InteractionLog/InteractionLog"
import { usePageBySlug } from "../../../../../services/hooks/usePage/usePageBySlug"
import { useTemplateBySlug } from "../../../../../services/hooks/useTemplate/useTemplateBySlug"

type TemplateLogsProps = {
  page: string
  template: string
}

export default function TemplateLogs({ page, template }: TemplateLogsProps) {
  const getPage = usePageBySlug({
    slug: page,
  })

  const getTemplate = useTemplateBySlug({
    slug: template,
  })

  return (
    <InteractionLog
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
