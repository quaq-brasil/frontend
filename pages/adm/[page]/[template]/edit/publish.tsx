import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import EditTemplate from "../../../../../layouts/main/EditTemplate/EditTemplate"
import { usePageByUrl } from "../../../../../services/hooks/usePage/usePageByUrl"
import { useTemplateByUrl } from "../../../../../services/hooks/useTemplate/useTemplateByUrl"
import { useUpdateTemplate } from "../../../../../services/hooks/useTemplate/useUpdateTemplate"
import { IPage } from "../../../../../types/Page.type"
import { ITemplate, IUpdateTemplate } from "../../../../../types/Template.type"

type EditTemplatePageProps = {
  page: string
  template: string
}

export default function EditTemplatePage({
  page,
  template,
}: EditTemplatePageProps) {
  const getPage = usePageByUrl({
    url: page,
  })

  const getTemplate = useTemplateByUrl({
    url: template,
  })

  const updateTemplate = useUpdateTemplate()

  const handleUpdateTemplate = (data: IUpdateTemplate) => {
    updateTemplate.mutate({
      id: getTemplate?.data.id as string,
      data: {
        name: data.name,
        url: data.url,
        shortcut_image: data.shortcut_image,
        shortcut_size: data.shortcut_size,
        current_publication_id: data.current_publication_id,
      },
    })
  }

  return (
    <EditTemplate
      initialTemplateData={getTemplate?.data as ITemplate}
      initialPageData={getPage?.data as IPage}
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
