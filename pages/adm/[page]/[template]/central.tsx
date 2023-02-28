import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import CentralOptions from "../../../../layouts/main/CentralOptions/CentralOptions"
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
import { pageUrls } from "../../../../utils/pagesUrl"
import { withAuth } from "../../../../utils/withAuth"

type TemplateAccessControlPageProps = {
  pageSlug: string
  templateSlug: string
  pageData: IPage
  templateData: ITemplate
}

export default function TemplateAccessControlPage({
  pageData,
  pageSlug,
  templateData,
  templateSlug,
}: TemplateAccessControlPageProps) {
  const router = useRouter()

  const getPage = usePageBySlug({
    slug: pageSlug,
    options: {
      initialData: pageData,
    },
  })

  const getTemplate = useTemplateBySlug({
    pageSlug: pageSlug,
    templateSlug: templateSlug,
    options: { initialData: templateData },
  })

  const updateTemplate = useUpdateTemplate()

  function handleUpdateTemplate(data: IUpdateTemplate) {
    updateTemplate.mutate(
      {
        id: getTemplate?.data.id as string,
        data: {
          title: data.title,
          slug: data.slug,
          shortcut_image: data.shortcut_image,
          shortcut_size: data.shortcut_size,
        },
      },
      {
        onSuccess: (data) => {
          router.push(
            pageUrls.templateCentral({
              pageSlug: getPage?.data.slug as string,
              templateSlug: data.slug,
              settings: "central",
            })
          )
        },
      }
    )
  }

  return (
    <CentralOptions
      initialPageData={getPage?.data}
      initialTemplateData={getTemplate?.data}
      handleUpdateTemplate={handleUpdateTemplate}
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
