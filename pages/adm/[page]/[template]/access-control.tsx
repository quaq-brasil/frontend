import TemplateAccessControl from "../../../../layouts/main/TemplateAccessControl/TemplateAccessControl"
import { usePage } from "../../../../services/hooks/usePage/usePage"
import { useTemplate } from "../../../../services/hooks/useTemplate/useTemplate"
import { IPage } from "../../../../types/Page.type"
import { ITemplate } from "../../../../types/Template.type"

type TemplateAccessControlPageProps = {
  pageId: string
}

export default function TemplateAccessControlPage({
  pageId,
}: TemplateAccessControlPageProps) {
  const getPage = usePage({
    id: "63b754987d02f98b8692255e",
  })

  const getTemplate = useTemplate({
    id: "63d2f4dd092cd140517d49c4",
  })

  return (
    <TemplateAccessControl
      initialTemplateData={getTemplate?.data as ITemplate}
      initialPageData={getPage?.data as IPage}
    />
  )
}
