import CentralTrackers from "../../layouts/main/CentralTrackers/CentralTrackers"
import { usePage } from "../../services/hooks/usePage/usePage"
import { useTemplate } from "../../services/hooks/useTemplate/useTemplate"
import { useUpdateTemplate } from "../../services/hooks/useTemplate/useUpdateTemplate"

type CentralTrackersPageProps = {
  pageId: string
  templateId: string
}

export default function CentralTrackersPage({
  pageId,
  templateId,
}: CentralTrackersPageProps) {
  const pageResponse = usePage({
    id: pageId ? pageId : "63b754987d02f98b8692255e",
  })

  const templateUpdate = useUpdateTemplate()

  function handleUpdateTrackers(face?: string, google?: string) {
    if (face) {
      templateUpdate.mutate({
        id: templateId ? templateId : "63d2f4dd092cd140517d49c4",
        data: {
          facebook_pixel_id: face,
        },
      })
    }
    if (google) {
    }
  }

  const templateResponse = useTemplate({
    id: templateId ? templateId : "63d2f4dd092cd140517d49c4",
  })

  return (
    <CentralTrackers
      handleUpdateTrackers={handleUpdateTrackers}
      pageData={pageResponse?.data}
      templateData={templateResponse?.data}
    />
  )
}
