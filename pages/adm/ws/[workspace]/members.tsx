import { WorkspaceMembers } from "layouts/main/WorkspaceMembers/WorkspaceMembers"
import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { api } from "services/api"
import { useWorkspaceBySlug } from "services/hooks/useWorkspace/useWorkspaceBySlug"
import { IWorkspace } from "types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

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

  return <WorkspaceMembers initialWorkspaceData={getWorkspace.data} />
}

type Params = {
  workspace: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    const { workspace } = ctx.params as Params

    async function getWorkspace({ cookies }: redirectNotFoundVerifyProps) {
      const { data } = await api.get(`/workspaces/slug/${workspace}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return {
        workspaceData: { data },
        workspaceSlug: workspace,
      }
    }

    return await RedirectNotFoundVerify(getWorkspace, ctx, cookies, payload)
  }
)
