import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import CentralTrackers from "../../../../layouts/main/CentralTrackers/CentralTrackers"
import { usePageByUrl } from "../../../../services/hooks/usePage/usePageBySlug"
import { useTemplateByUrl } from "../../../../services/hooks/useTemplate/useTemplateBySlug"
import { useUpdateTemplate } from "../../../../services/hooks/useTemplate/useUpdateTemplate"
import { IUpdateTemplate } from "../../../../types/Template.type"

type CentralTrackersPageProps = {
  page: string
  template: string
}

export default function CentralTrackersPage({
  page,
  template,
}: CentralTrackersPageProps) {
  const pageResponse = usePageByUrl({ url: page })

  const getTemplate = useTemplateByUrl({
    url: template,
  })

  const templateUpdate = useUpdateTemplate()

  function handleUpdateTrackers(data: IUpdateTemplate) {
    templateUpdate.mutate({
      id: getTemplate?.data.id as string,
      data: {
        trackers: data.trackers,
      },
    })
  }

  return (
    <CentralTrackers
      handleUpdateTrackers={handleUpdateTrackers}
      initialPageData={pageResponse?.data}
      initialTemplateData={getTemplate?.data}
    />
  )
}

type Params = {
  page: string
  template: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { page, template } = params as Params

  return {
    props: {
      page,
      template,
    },
  }
}
