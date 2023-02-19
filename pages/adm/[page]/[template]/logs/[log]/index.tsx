import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import LogContent from "../../../../../../layouts/main/InteractionLog/LogContent"
import { useInteraction } from "../../../../../../services/hooks/useInteraction/useInteraction"

type TemplateLogsProps = {
  page: string
  template: string
  log: string
}

export default function TemplateLogs({
  page,
  template,
  log,
}: TemplateLogsProps) {
  const getInteractionLog = useInteraction({ id: log })

  return <LogContent initialLogData={getInteractionLog?.data} />
}

type Params = {
  page: string
  template: string
  log: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { page, template, log } = params as Params

  return {
    props: {
      page,
      template,
      log,
    },
  }
}
