import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { CreatePage } from "../../../../layouts/Onboarding/CreatePage/CreatePage"
import { useCreatePage } from "../../../../services/hooks/usePage/useCreatePage"
import { useWorkspaceBySlug } from "../../../../services/hooks/useWorkspace/useWorkspaceBySlug"
import { IUpdatePage } from "../../../../types/Page.type"
import { pageUrls } from "../../../../utils/pagesUrl"

type CreatePagePagePros = {
  workspace: string
}

export default function CreatePagePage({ workspace }: CreatePagePagePros) {
  const getWorkspace = useWorkspaceBySlug({ slug: workspace })

  const createPage = useCreatePage()

  const router = useRouter()

  const handleCreatePage = (data: IUpdatePage) => {
    createPage.mutate(
      {
        data: {
          title: data.title as string,
          slug: data.slug as string,
          description: data.description as string,
          workspace_id: getWorkspace?.data.id as string,
          avatar_url: data.avatar_url as string,
          background_url: data.background_url as string,
          services: {},
          trackers: {},
        },
      },
      {
        onSuccess: (pageData) => {
          const { slug } = pageData
          router.push(pageUrls.pageSettings({ pageSlug: slug }))
        },
      }
    )
  }

  return (
    <CreatePage
      handleCreatePage={handleCreatePage}
      initialWorkspaceData={getWorkspace?.data}
    />
  )
}

type Params = {
  workspace: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { workspace } = params as Params

  return {
    props: {
      workspace,
    },
  }
}
