import EditTemplate from "../../layouts/main/EditTemplate/EditTemplate"
import { usePage } from "../../services/hooks/usePage/usePage"
import { useTemplate } from "../../services/hooks/useTemplate/useTemplate"
import { useUpdateTemplate } from "../../services/hooks/useTemplate/useUpdateTemplate"
import { IPage } from "../../types/Page.type"
import { ITemplate, IUpateTemplate } from "../../types/Template.type"

type EditTemplatePageProps = {
  pageId: string
  templateId: string
}

export default function EditTemplatePage({
  templateId,
  pageId,
}: EditTemplatePageProps) {
  const getPage = usePage({
    id: "63b754987d02f98b8692255e",
  })

  const getTemplate = useTemplate({
    id: "63d2f4dd092cd140517d49c4",
  })

  const updateTemplate = useUpdateTemplate()

  const handleUpdateTemplate = (data: IUpateTemplate) => {
    console.log("aqui foi")
    updateTemplate.mutate({
      id: "63d2f4dd092cd140517d49c4",
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
