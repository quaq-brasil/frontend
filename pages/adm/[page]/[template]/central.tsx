import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import CentralOptions from "../../../../layouts/main/CentralOptions/CentralOptions"
import { usePageByUrl } from "../../../../services/hooks/usePage/usePageByUrl"
import { useTemplateByUrl } from "../../../../services/hooks/useTemplate/useTemplateByUrl"
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

  const getPage = usePageByUrl({
    url: page,
  })

  const getTemplate = useTemplateByUrl({
    url: template,
  })

  const updateTemplate = useUpdateTemplate()

  function handleUpdateTemplate(data: IUpdateTemplate) {
    updateTemplate.mutate(
      {
        id: getTemplate?.data.id as string,
        data: {
          name: data.name,
          url: data.url,
          shortcut_image: data.shortcut_image,
          shortcut_size: data.shortcut_size,
        },
      },
      {
        onSuccess: (data) => {
          router.push(
            pageUrls.templateCentral({
              pageSlug: getPage?.data.url as string,
              templateSlug: data.url,
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
