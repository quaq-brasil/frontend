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
    id: pageId || "63b754987d02f98b8692255e",
  })

  const getTemplate = useTemplate({
    id: templateId || "63d2f4dd092cd140517d49c4",
  })

  const updateTemplate = useUpdateTemplate()

  const handleUpdateTemplate = (data: IUpateTemplate) => {
    updateTemplate.mutate({
      id: pageId ? pageId : "63b754987d02f98b8692255e",
      data,
    })
  }

  return (
    <EditTemplate
      templateData={getTemplate?.data as ITemplate}
      pageData={getPage?.data as IPage}
      handleUpdateTemplate={handleUpdateTemplate}
    />
  )
}
