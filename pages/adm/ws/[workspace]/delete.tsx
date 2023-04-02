import { WorkspaceDelete } from "layouts/main/WorkspaceDelete/WorkspaceDelete"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { api } from "services/api"
import { useUser } from "services/hooks/useUser/useUser"
import { useDeleteWorkspace } from "services/hooks/useWorkspace/useDeleteWorkspace"
import { useWorkspaceBySlug } from "services/hooks/useWorkspace/useWorkspaceBySlug"
import { IUser } from "types/User.type"
import { IWorkspace } from "types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

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
  const getUser = useUser({
    options: {
      initialData: userData,
    },
  })

  const getWorkspace = useWorkspaceBySlug({
    slug: workspaceSlug,
    options: { initialData: workspaceData },
  })

  const deleteWorkspace = useDeleteWorkspace()

  function handleDeleteWorkspace() {
    deleteWorkspace.mutate({ id: getWorkspace.data.id })
  }

  const [localWorkspaceData, setLocalWorkspaceData] =
    useState<IWorkspace | null>(null)
  const [workspaceTitle, setWorkspaceTitle] = useState<string | null>(null)

  useEffect(() => {
    if (getWorkspace.data && !localWorkspaceData) {
      setLocalWorkspaceData(getWorkspace.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getWorkspace])

  useEffect(() => {
    if (localWorkspaceData) {
      let wsTitle =
        localWorkspaceData.title.charAt(0).toUpperCase() +
        localWorkspaceData.title.slice(1).toLowerCase()

      setWorkspaceTitle(wsTitle)
    }
  }, [localWorkspaceData])

  return (
    <>
      <Head>
        <title>{workspaceTitle}</title>
        <meta name="description" content={`${workspaceTitle} workspace.`} />
      </Head>
      <WorkspaceDelete
        initialWorkspaceData={localWorkspaceData}
        initialUserData={getUser.data}
        handleDeleteWorkspace={handleDeleteWorkspace}
      />
    </>
  )
}

type Params = {
  workspace: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: { params: Params }, cookies: any, payload: any) => {
    const { workspace } = ctx.params

    async function getWorkspace({ cookies }: redirectNotFoundVerifyProps) {
      const { data: userData } = await api.get("users", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      const { data: workspacesData } = await api.get(
        `/workspaces/slug/${workspace}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )

      return {
        workspaceData: { workspacesData },
        workspaceSlug: workspace,
        userData: { userData },
      }
    }

    return await RedirectNotFoundVerify({
      func: getWorkspace,
      ctx,
      cookies,
      payload,
    })
  }
)
