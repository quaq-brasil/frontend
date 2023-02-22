import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import CentralOptions from "../../../../layouts/main/CentralOptions/CentralOptions"
import { usePageBySlug } from "../../../../services/hooks/usePage/usePageBySlug"
import { useTemplateBySlug } from "../../../../services/hooks/useTemplate/useTemplateBySlug"
import { useUpdateTemplate } from "../../../../services/hooks/useTemplate/useUpdateTemplate"
import { IUpdateTemplate } from "../../../../types/Template.type"
import { pageUrls } from "../../../../utils/pagesUrl"

type TemplateAccessControlPageProps = {
  page: string
  template: string
}

export default function TemplateAccessControlPage({
  page,
  template,
}: TemplateAccessControlPageProps) {
  const router = useRouter()

  const getPage = usePageBySlug({
    slug: page,
  })

  const getTemplate = useTemplateBySlug({
    slug: template,
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
