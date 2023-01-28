import CentralTrackers from "../../layouts/main/CentralTrackers/CentralTrackers"
import { usePage } from "../../services/hooks/usePage/usePage"
import { useTemplate } from "../../services/hooks/useTemplate/useTemplate"
import { useUpdateTemplate } from "../../services/hooks/useTemplate/useUpdateTemplate"
import { IUpateTemplate } from "../../types/Template.type"

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

  function handleUpdateTrackers(data: IUpateTemplate) {
    templateUpdate.mutate({
      id: templateId ? templateId : "63d2f4dd092cd140517d49c4",
      data: data,
    })
  }

  const getTemplate = useTemplate({
    id: templateId ? templateId : "63d2f4dd092cd140517d49c4",
  })

  return (
    <CentralTrackers
      handleUpdateTrackers={handleUpdateTrackers}
      pageData={pageResponse?.data}
      templateData={getTemplate?.data}
    />
  )
}
