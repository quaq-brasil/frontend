import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import WorkspaceAdvanced from "../../../../layouts/main/WorkspaceAdvanced/WorkspaceAdvanced"
import { api } from "../../../../services/api"
import { useWorkspaceBySlug } from "../../../../services/hooks/useWorkspace/useWorkspaceBySlug"
import { IWorkspace } from "../../../../types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps
} from "../../../../utils/404Redirect"
import { withAuth } from "../../../../utils/withAuth"

type WorkspaceAdvancedPageProps = {
  workspaceData: IWorkspace
  workspaceSlug: string
}

export default function WorkspaceAdvancedPage({
  workspaceData,
  workspaceSlug,
}: WorkspaceAdvancedPageProps) {
  const getWorkspace = useWorkspaceBySlug({
    slug: workspaceSlug,
    options: { initialData: workspaceData },
  })

  return <WorkspaceAdvanced initialWorkspaceData={getWorkspace.data} />
}

type Params = {
  workspace: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: { params: Params }, cookies: any, payload: any) => {
    const { workspace } = ctx.params

    async function getWorkspace({ cookies }: redirectNotFoundVerifyProps) {
      const { data } = await api.get(`/workspaces/slug/${workspace}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return {
        workspacesData: { data },
        workspaceSlug: workspace,
      }
    }

    return await RedirectNotFoundVerify(getWorkspace, ctx, cookies, payload)
  }
)
