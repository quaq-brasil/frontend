import { GetServerSideProps } from "next"
import Explorer from "../layouts/main/Explorer/Explorer"
import { api } from "../services/api"
import { usePage } from "../services/hooks/usePage/usePage"
import { useTemplatesByPageId } from "../services/hooks/useTemplate/useTemplatesByPageId"
import { IPage } from "../types/Page.type"
import { ITemplate } from "../types/Template.type"
import { RedirectNotFoundVerify } from "../utils/404Redirect"

type ConsumerPagePageProps = {
  pageData: IPage
  templatesData: ITemplate[]
}

export default function Custom404({
  pageData,
  templatesData,
}: ConsumerPagePageProps) {
  const getPage = usePage({
    id: "63b754987d02f98b8692255e",
    options: { initialData: pageData },
  })

  const getTemplates = useTemplatesByPageId({
    id: "63b754987d02f98b8692255e",
    options: { initialData: templatesData },
  })

  return (
    <Explorer
      initialPageData={getPage.data}
      initialTemplatesData={getTemplates.data}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  async function getPage() {
    const { data: pageData } = await api.get(`/pages/63b754987d02f98b8692255e`)

    const { data: templatesData } = await api.get(
      `/templates/page/63b754987d02f98b8692255e`
    )

    return {
      pageData: { pageData },
      templatesData: [...templatesData],
    }
  }

  return await RedirectNotFoundVerify(getPage, ctx)
}
