import PublishTemplate from "../../layouts/main/PublishTemplate/PublishTemplate"
import { usePageByUrl } from "../../services/hooks/usePage/usePageByUrl"
import { useCreatePublication } from "../../services/hooks/usePublication/useCreatePublication"
import { useCreateTemplate } from "../../services/hooks/useTemplate/useCreateTemplate"
import { IPage } from "../../types/Page.type"
import { IPublication } from "../../types/Publication.type"
import { ITemplate } from "../../types/Template.type"

export default function PublishTemplatePage() {
  const pageLink = "testing"

  const getPage = usePageByUrl({
    url: pageLink,
  })

  const createTemplate = useCreateTemplate()

  const handleCreateTemplate = (data: ITemplate) => {
    createTemplate.mutate({
      data,
    })
  }

  const createPublication = useCreatePublication()

  const handleCreatePublication = (data: IPublication) => {
    createPublication.mutate({
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
