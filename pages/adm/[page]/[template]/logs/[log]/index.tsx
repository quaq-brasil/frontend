import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import LogContent from "../../../../../../layouts/main/InteractionLog/LogContent"
import { api } from "../../../../../../services/api"
import { useInteraction } from "../../../../../../services/hooks/useInteraction/useInteraction"
import { useTemplateBySlugAndPageSlug } from "../../../../../../services/hooks/useTemplate/useTemplateByUrlAndPageUrl"
import { IInteraction } from "../../../../../../types/Interaction.type"
import { getTemplateBySlugAndPageSlugProps } from "../../../../../../types/Template.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../../../../utils/404Redirect"
import { withAuth } from "../../../../../../utils/withAuth"

type TemplateLogsProps = {
  pageSlug: string
  templateSlug: string
  logId: string
  pageAndTemplateData: getTemplateBySlugAndPageSlugProps
  logData: IInteraction
}

export default function TemplateLogs({
  logData,
  logId,
  pageAndTemplateData,
  pageSlug,
  templateSlug,
}: TemplateLogsProps) {
  const getPageAndTemplate = useTemplateBySlugAndPageSlug({
    slug: templateSlug,
    page_slug: pageSlug,
    options: {
      initialData: pageAndTemplateData,
    },
  })

  const getInteractionLog = useInteraction({
    id: logId,
    options: { initialData: logData },
  })

  return (
    <LogContent
      initialLogData={getInteractionLog?.data}
      initialPageData={getPageAndTemplate?.data?.Page}
      initialTemplateData={getPageAndTemplate?.data}
    />
  )
}

type Params = {
  page: string
  template: string
  log: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    const { page, template, log } = ctx.params as Params

    async function getTemplate({ cookies }: redirectNotFoundVerifyProps) {
      const { data: pageAndTemplateData } = await api.get(
        `/templates/${page}/${template}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )

      const { data: logData } = await api.get(`/interactions/${log}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return {
        pageSlug: page,
        templateSlug: template,
        logId: log,
        pageAndTemplateData: { pageAndTemplateData },
        logData: { logData },
      }
    }

    return await RedirectNotFoundVerify(getTemplate, ctx, cookies, payload)
  }
)
