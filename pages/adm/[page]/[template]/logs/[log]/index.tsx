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
      initialLogData={getInteractionLog.data}
      initialPageData={getPageAndTemplate.data.Page}
      initialTemplateData={getPageAndTemplate.data}
    />
  )
}

type Params = {
  pageSlug: string
  templateSlug: string
  logId: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    const { pageSlug, templateSlug, logId } = ctx.params as Params

    async function getTemplate({ cookies }: redirectNotFoundVerifyProps) {
      const { data: pageAndTemplateData } = await api.get(
        `/templates/${pageSlug}/${templateSlug}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )

      const { data: logData } = await api.get(`/interactions/${logId}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return {
        pageSlug: pageSlug,
        templateSlug: templateSlug,
        logId: logId,
        pageAndTemplateData,
        logData,
      }
    }

    return await RedirectNotFoundVerify(getTemplate, ctx, cookies, payload)
  }
)
