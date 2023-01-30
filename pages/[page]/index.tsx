import ConsumerPage from "../../layouts/main/ConsumerPage/ConsumerPage"
import { usePage } from "../../services/hooks/usePage/usePage"
import { useTemplatesByPageId } from "../../services/hooks/useTemplate/useTemplatesByPageId"
import { IPage } from "../../types/Page.type"
import { ITemplate } from "../../types/Template.type"

type ConsumerPagePageProps = {
  pageId: string
}

export default function ConsumerPagePage({ pageId }: ConsumerPagePageProps) {
  const getPage = usePage({
    id: "63b754987d02f98b8692255e",
  })

  const getTemplates = useTemplatesByPageId({ id: "63b754987d02f98b8692255e" })

  return (
    <ConsumerPage
      initialPageData={getPage?.data as IPage}
      initialTemplatesData={getTemplates?.data as ITemplate[]}
    />
  )
}