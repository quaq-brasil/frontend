import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import WorkspaceMembers from "../../../../layouts/main/WorkspaceMembers/WorkspaceMembers"
import { api } from "../../../../services/api"
import { useUpdateWorkspace } from "../../../../services/hooks/useWorkspace/useUpdateWorkspace"
import { useWorkspaceBySlug } from "../../../../services/hooks/useWorkspace/useWorkspaceBySlug"
import { IUpdateWorkspace, IWorkspace } from "../../../../types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../../utils/404Redirect"
import { withAuth } from "../../../../utils/withAuth"

type WorkspaceMembersPageProps = {
  workspaceData: IWorkspace
  workspaceSlug: string
}

export default function WorkspaceMembersPage({
  workspaceData,
  workspaceSlug,
}: WorkspaceMembersPageProps) {
  const getWorkspace = useWorkspaceBySlug({
    slug: workspaceSlug,
    options: { initialData: workspaceData },
  })

  const updateWorkspace = useUpdateWorkspace()

  function handleUpdateWorkspace(data: IUpdateWorkspace) {
    updateWorkspace.mutate({
      id: getWorkspace.data.id,
      data: {
        title: data?.title,
        avatar_url: data.avatar_url,
      },
    })
  }

  return (
    <WorkspaceMembers
      initialWorkspaceData={getWorkspace.data}
      handleUpdateWorkspace={handleUpdateWorkspace}
    />
  )
}

type Params = {
  workspaceSlug: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    const { workspaceSlug } = ctx.params as Params

    async function getWorkspace({ cookies }: redirectNotFoundVerifyProps) {
      const { data: workspacesData } = await api.get(
        `/workspaces/slug/${workspaceSlug}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )

      return {
        workspacesData,
        workspaceSlug,
      }
    }

    return await RedirectNotFoundVerify(getWorkspace, ctx, cookies, payload)
  }
)
