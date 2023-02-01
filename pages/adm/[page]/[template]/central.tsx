import CentralOptions from "../../../../layouts/main/CentralOptions/CentralOptions"
import { usePage } from "../../../../services/hooks/usePage/usePage"
import { useTemplate } from "../../../../services/hooks/useTemplate/useTemplate"

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

  return <CentralOptions />
}
