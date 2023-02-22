import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import GeneralSettings from "../../../../layouts/main/GeneralSettings/GeneralSettings"
import { usePageBySlug } from "../../../../services/hooks/usePage/usePageBySlug"
import { useUpdatePage } from "../../../../services/hooks/usePage/useUpdatePage"
import { IUpdatePage } from "../../../../types/Page.type"
import { pageUrls } from "../../../../utils/pagesUrl"

type GeneralSettingsPageProps = {
  page: string
}

export default function GeneralSettingsPage({
  page,
}: GeneralSettingsPageProps) {
  const router = useRouter()

  const getPage = usePageBySlug({
    slug: page,
  })

  const updatePage = useUpdatePage()

  function handleUpdatePage(data: IUpdatePage) {
    updatePage.mutate(
      {
        id: getPage?.data.id as string,
        data: {
          avatar_url: data.avatar_url,
          background_url: data.background_url,
          title: data.title,
          slug: data.slug,
          description: data.description,
        },
      },
      {
        onSuccess: (data) => {
          router.push(
            pageUrls.pageSettings({
              pageSlug: data.slug,
              pageSettings: "general",
            })
          )
        },
      }
    )
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
