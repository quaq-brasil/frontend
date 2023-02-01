import CentralOptions from "../../../../layouts/main/CentralOptions/CentralOptions"
import { usePage } from "../../../../services/hooks/usePage/usePage"
import { useTemplate } from "../../../../services/hooks/useTemplate/useTemplate"
import { useUpdateTemplate } from "../../../../services/hooks/useTemplate/useUpdateTemplate"
import { IUpdateTemplate } from "../../../../types/Template.type"

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

  const updateTemplate = useUpdateTemplate()

  function handleUpdateTemplate(data: IUpdateTemplate) {
    updateTemplate.mutate({
      id: "63d2f4dd092cd140517d49c4",
      data: {
        name: data.name,
        url: data.url,
        shortcut_image: data.shortcut_image,
        shortcut_size: data.shortcut_size,
      },
    })
  }

  return (
    <CentralOptions
      initialPageData={getPage?.data}
      initialTemplateData={getTemplate?.data}
      handleUpdateTemplate={handleUpdateTemplate}
    />
  )
}
