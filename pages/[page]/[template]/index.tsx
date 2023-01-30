import TemplateExecution from "../../../layouts/main/TemplateExecution/TemplateExecution"
import { usePage } from "../../../services/hooks/usePage/usePage"
import { useTemplateByUrl } from "../../../services/hooks/useTemplate/useTemplateByUrl"

export default function TemplateExecutionPage() {
  const getPage = usePage({
    id: "63b754987d02f98b8692255e",
  })

  const getTemplate = useTemplateByUrl({
    url: "namizinho",
  })

  return (
    <TemplateExecution
      initialPageData={getPage?.data}
      initialTemplateData={getTemplate?.data}
    />
  )
}
