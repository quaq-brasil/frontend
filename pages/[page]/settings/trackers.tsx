import PageTrackers from "../../../layouts/main/PageTrackers/PageTrackers"
import { usePage } from "../../../services/hooks/usePage/usePage"
import { useUpdatePage } from "../../../services/hooks/usePage/useUpdatePage"
import { IUpdatePage } from "../../../types/Page.type"

type PageTrackersPageProps = {
  pageId: string
  templateId: string
}

export default function PageTrackersPage({
  pageId,
  templateId,
}: PageTrackersPageProps) {
  const pageResponse = usePage({
    id: "63b754987d02f98b8692255e",
  })

  const pageUpdate = useUpdatePage()

  function handleUpdateTrackers(data: IUpdatePage) {
    pageUpdate.mutate({
      id: "63b754987d02f98b8692255e",
      data: {
        trackers: data.trackers,
      },
    })
  }

  return (
    <PageTrackers
      handleUpdateTrackers={handleUpdateTrackers}
      initialPageData={pageResponse?.data}
    />
  )
}
