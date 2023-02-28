import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { CreatePage } from "../../../../layouts/Onboarding/CreatePage/CreatePage"
import { api } from "../../../../services/api"
import { useCreatePage } from "../../../../services/hooks/usePage/useCreatePage"
import { useWorkspaceBySlug } from "../../../../services/hooks/useWorkspace/useWorkspaceBySlug"
import { IUpdatePage } from "../../../../types/Page.type"
import { IWorkspace } from "../../../../types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../../utils/404Redirect"
import { pageUrls } from "../../../../utils/pagesUrl"
import { withAuth } from "../../../../utils/withAuth"

type CreatePagePagePros = {
  workspaceData: IWorkspace
  workspaceSlug: string
}

export default function CreatePagePage({
  workspaceData,
  workspaceSlug,
}: CreatePagePagePros) {
  const getWorkspace = useWorkspaceBySlug({
    slug: workspaceSlug,
    options: { initialData: workspaceData },
  })

  const createPage = useCreatePage()

  const router = useRouter()

  const handleCreatePage = (data: IUpdatePage) => {
    createPage.mutate(
      {
        data: {
          title: data.title,
          slug: data.slug,
          description: data.description,
          workspace_id: getWorkspace.data.id,
          avatar_url: data.avatar_url,
          background_url: data.background_url,
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

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    const { workspace } = ctx.params as Params

    async function getWorkspace({ cookies }: redirectNotFoundVerifyProps) {
      const { data: workspacesData } = await api.get(
        `/workspaces/slug/${workspace}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )

      return {
        workspacesData,
        workspaceSlug: workspace,
      }
    }

    return await RedirectNotFoundVerify(getWorkspace, ctx, cookies, payload)
  }
)
