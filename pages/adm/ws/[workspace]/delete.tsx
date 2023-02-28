import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import WorkspaceDelete from "../../../../layouts/main/WorkspaceDelete/WorkspaceDelete"
import { api } from "../../../../services/api"
import { useDeleteWorkspace } from "../../../../services/hooks/useWorkspace/useDeleteWorkspace"
import { useWorkspaceBySlug } from "../../../../services/hooks/useWorkspace/useWorkspaceBySlug"
import { IUser } from "../../../../types/User.type"
import { IWorkspace } from "../../../../types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../../utils/404Redirect"
import { withAuth } from "../../../../utils/withAuth"

type WorkspaceDeletePageProps = {
  workspaceData: IWorkspace
  workspaceSlug: string
  userData: IUser
}

export default function WorkspaceDeletePage({
  workspaceData,
  workspaceSlug,
  userData,
}: WorkspaceDeletePageProps) {
  const getWorkspace = useWorkspaceBySlug({
    slug: workspaceSlug,
    options: { initialData: workspaceData },
  })

  const deleteWorkspace = useDeleteWorkspace()

  function handleDeleteWorkspace() {
    deleteWorkspace.mutate({ id: getWorkspace.data.id })
  }

  return (
    <WorkspaceDelete
      initialWorkspaceData={getWorkspace?.data as IWorkspace}
      initialUserData={userData}
      handleDeleteWorkspace={handleDeleteWorkspace}
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
      const { data: userData } = await api.get("users", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

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
        userData,
      }
    }

    return await RedirectNotFoundVerify(getWorkspace, ctx, cookies, payload)
  }
)
