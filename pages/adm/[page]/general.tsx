import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import GeneralSettings from "../../../layouts/main/GeneralSettings/GeneralSettings"
import { usePageByUrl } from "../../../services/hooks/usePage/usePageByUrl"
import { useUpdatePage } from "../../../services/hooks/usePage/useUpdatePage"
import { IUpdatePage } from "../../../types/Page.type"

type GeneralSettingsPageProps = {
  page: string
}

export default function GeneralSettingsPage({
  page,
}: GeneralSettingsPageProps) {
  const getPage = usePageByUrl({
    url: page,
  })

  const updatePage = useUpdatePage()

  function handleUpdatePage(data: IUpdatePage) {
    updatePage.mutate({
      id: getPage?.data.id as string,
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
      initialPageData={getPage?.data as IUpdatePage}
      handleUpdatePage={handleUpdatePage}
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
