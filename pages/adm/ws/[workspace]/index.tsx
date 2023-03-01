import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import WorkspaceSettings from "../../../../layouts/main/WorkspaceSettings/WorkspaceSettings"
import { api } from "../../../../services/api"
import { useUpdateWorkspace } from "../../../../services/hooks/useWorkspace/useUpdateWorkspace"
import { useWorkspaceBySlug } from "../../../../services/hooks/useWorkspace/useWorkspaceBySlug"
import { IUpdateWorkspace, IWorkspace } from "../../../../types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../../utils/404Redirect"
import { withAuth } from "../../../../utils/withAuth"

type WorkspaceSettingsPageProps = {
  workspaceData: IWorkspace
  workspaceSlug: string
}

export default function WorkspaceSettingsPage({
  workspaceData,
  workspaceSlug,
}: WorkspaceSettingsPageProps) {
  const getWorkspace = useWorkspaceBySlug({
    slug: workspaceSlug,
    options: { initialData: workspaceData },
  })

  const updateWorkspace = useUpdateWorkspace()

  function handleUpdateWorkspace(data: IUpdateWorkspace) {
    updateWorkspace.mutate({
      id: getWorkspace.data.id,
      data: {
        ...data,
      },
    })
  }

  return (
    <WorkspaceSettings
      initialWorkspaceData={getWorkspace.data}
      handleUpdateWorkspace={handleUpdateWorkspace}
    />
  )
}

type Params = {
  workspace: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: { params: Params }, cookies: any, payload: any) => {
    const { workspaceSlug } = ctx.params

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
