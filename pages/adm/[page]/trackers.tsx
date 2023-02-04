import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import PageTrackers from "../../../layouts/main/PageTrackers/PageTrackers"
import { usePageByUrl } from "../../../services/hooks/usePage/usePageByUrl"
import { useUpdatePage } from "../../../services/hooks/usePage/useUpdatePage"
import { IUpdatePage } from "../../../types/Page.type"

type PageTrackersPageProps = {
  page: string
}

export default function PageTrackersPage({ page }: PageTrackersPageProps) {
  const getPage = usePageByUrl({ url: page })

  const pageUpdate = useUpdatePage()

  function handleUpdateTrackers(data: IUpdatePage) {
    pageUpdate.mutate({
      id: getPage?.data.id as string,
      data: {
        trackers: data.trackers,
      },
    })
  }

  return (
    <PageTrackers
      handleUpdateTrackers={handleUpdateTrackers}
      initialPageData={getPage?.data}
    />
  )
}

type Params = {
  page: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { page } = params as Params

  return {
    props: {
      page,
    },
  }
}
