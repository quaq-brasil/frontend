import { WorkspaceMembers } from "layouts/main/WorkspaceMembers/WorkspaceMembers"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
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
      <WorkspaceMembers initialWorkspaceData={localWorkspaceData} />
    </>
  )
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

    return await RedirectNotFoundVerify({
      func: getWorkspace,
      ctx,
      cookies,
      payload,
    })
  }
)
