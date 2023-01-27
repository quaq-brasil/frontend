import GeneralSettings from "../../layouts/main/GeneralSettings/GeneralSettings"
import { usePage } from "../../services/hooks/usePage/usePage"
import { useUpdatePage } from "../../services/hooks/usePage/useUpdatePage"
import { IUpdatePage } from "../../types/Page.type"

type GeneralSettingsPageProps = {
  pageId: string
  templateId: string
}

export default function GeneralSettingsPage({
  pageId,
  templateId,
}: GeneralSettingsPageProps) {
  const pageResponse = usePage({
    id: pageId ? pageId : "63b754987d02f98b8692255e",
  })

  const updatePage = useUpdatePage()

  function handleUpdatePage(data: IUpdatePage) {
    updatePage.mutate({
      id: pageId ? pageId : "63b754987d02f98b8692255e",
      data,
    })
  }

  return (
    <GeneralSettings
      pageData={pageResponse?.data as IUpdatePage}
      handleUpdatePage={handleUpdatePage}
    />
  )
}
