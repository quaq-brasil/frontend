import GeneralSettings from "../../../layouts/main/GeneralSettings/GeneralSettings"
import { usePage } from "../../../services/hooks/usePage/usePage"
import { useUpdatePage } from "../../../services/hooks/usePage/useUpdatePage"
import { IUpdatePage } from "../../../types/Page.type"

type GeneralSettingsPageProps = {
  pageId: string
}

export default function GeneralSettingsPage({
  pageId,
}: GeneralSettingsPageProps) {
  const pageResponse = usePage({
    id: "63b754987d02f98b8692255e",
  })

  const updatePage = useUpdatePage()

  function handleUpdatePage(data: IUpdatePage) {
    updatePage.mutate({
      id: "63b754987d02f98b8692255e",
      data: {
        avatar_url: data.avatar_url,
        background_url: data.background_url,
        name: data.name,
        url: data.url,
        description: data.description,
      },
    })
  }

  return (
    <GeneralSettings
      initialPageData={pageResponse?.data as IUpdatePage}
      handleUpdatePage={handleUpdatePage}
    />
  )
}
