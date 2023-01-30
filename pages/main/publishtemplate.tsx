import PublishTemplate from "../../layouts/main/PublishTemplate/PublishTemplate"
import { usePageByUrl } from "../../services/hooks/usePage/usePageByUrl"
import { useCreateTemplate } from "../../services/hooks/useTemplate/useCreateTemplate"
import { IPage } from "../../types/Page.type"
import { ITemplate } from "../../types/Template.type"

export default function PublishTemplatePage() {
  const pageLink = "felpspage"

  const getPage = usePageByUrl({
    url: pageLink,
  })

  const createTemplate = useCreateTemplate()

  const handleCreateTemplate = (data: ITemplate) => {
    createTemplate.mutate({
      data,
    })
  }

  return (
    <PublishTemplate
      initialPageData={getPage?.data as IPage}
      handleCreateTemplate={handleCreateTemplate}
    />
  )
}
