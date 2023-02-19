import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import InteractionLog from "../../../../../layouts/main/InteractionLog/InteractionLog"
import { usePageByUrl } from "../../../../../services/hooks/usePage/usePageByUrl"
import { useTemplateByUrl } from "../../../../../services/hooks/useTemplate/useTemplateByUrl"

type TemplateLogsProps = {
  page: string
  template: string
}

export default function TemplateLogs({ page, template }: TemplateLogsProps) {
  const router = useRouter()

  const getPage = usePageByUrl({
    url: page,
  })

  const getTemplate = useTemplateByUrl({
    url: template,
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
