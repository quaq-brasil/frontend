import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import CentralTrackers from "../../../../layouts/main/CentralTrackers/CentralTrackers"
import { api } from "../../../../services/api"
import { usePageBySlug } from "../../../../services/hooks/usePage/usePageBySlug"
import { useTemplateBySlug } from "../../../../services/hooks/useTemplate/useTemplateBySlug"
import { useUpdateTemplate } from "../../../../services/hooks/useTemplate/useUpdateTemplate"
import { IPage } from "../../../../types/Page.type"
import { ITemplate, IUpdateTemplate } from "../../../../types/Template.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../../utils/404Redirect"
import { withAuth } from "../../../../utils/withAuth"

type CentralTrackersPageProps = {
  pageSlug: string
  templateSlug: string
  pageData: IPage
  templateData: ITemplate
}

export default function CentralTrackersPage({
  pageSlug,
  templateSlug,
  pageData,
  templateData,
}: CentralTrackersPageProps) {
  const getPage = usePageBySlug({
    slug: pageSlug,
    options: { initialData: pageData },
  })

  const getTemplate = useTemplateBySlug({
    pageSlug: pageSlug,
    templateSlug: templateSlug,
    options: { initialData: templateData },
  })

  const templateUpdate = useUpdateTemplate()

  function handleUpdateTrackers(data: IUpdateTemplate) {
    templateUpdate.mutate({
      id: getTemplate.data.id,
      data: {
        trackers: data.trackers,
      },
    })
  }

  return (
    <CentralTrackers
      handleUpdateTrackers={handleUpdateTrackers}
      initialPageData={getPage.data}
      initialTemplateData={getTemplate.data}
    />
  )
}

type Params = {
  pageSlug: string
  templateSlug: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    const { pageSlug, templateSlug } = ctx.params as Params

    async function getPageAndTemplate({
      cookies,
    }: redirectNotFoundVerifyProps) {
      const { data: pageData } = await api.get(`/pages/slug/${pageSlug}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      const { data: templateData } = await api.get(
        `/templates/${pageSlug}/${templateSlug}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )

      return {
        pageSlug: pageSlug,
        templateSlug: templateSlug,
        pageData,
        templateData,
      }
    }

    return await RedirectNotFoundVerify(
      getPageAndTemplate,
      ctx,
      cookies,
      payload
    )
  }
)
