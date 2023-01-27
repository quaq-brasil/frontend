import PublishTemplate from "../../layouts/main/PublishTemplate/PublishTemplate"
import { usePage } from "../../services/hooks/usePage/usePage"
import { useCreateTemplate } from "../../services/hooks/useTemplate/useCreateTemplate"
import { IPage } from "../../types/Page.type"
import { ITemplate } from "../../types/Template.type"

type PublishTemplatePageProps = {
  pageId: string
  templateId: string
}

export default function PublishTemplatePage({
  templateId,
  pageId,
}: PublishTemplatePageProps) {
  const getPage = usePage({
    id: pageId || "63b754987d02f98b8692255e",
  })

  const createTempalte = useCreateTemplate()

  const handleCreateTemplate = (data: ITemplate) => {
    createTempalte.mutate({
      data,
    })
  }

  return (
    <PublishTemplate
      pageData={getPage?.data as IPage}
      handleCreateTemplate={handleCreateTemplate}
    />
  )
}
