import { WorkspaceAdvanced } from "layouts/main/WorkspaceAdvanced/WorkspaceAdvanced"
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

  const [workspaceTitle, setWorkspaceTitle] = useState<string | null>(null)

  useEffect(() => {
    if (getWorkspace) {
      let wsTitle =
        getWorkspace.data.title.charAt(0).toUpperCase() +
        getWorkspace.data.title.slice(1).toLowerCase()

      setWorkspaceTitle(wsTitle)
    }
  }, [getWorkspace])

  return (
    <>
      <Head>
        <title>{workspaceTitle}</title>
        <meta name="description" content={`${workspaceTitle} workspace.`} />
      </Head>
      <WorkspaceAdvanced initialWorkspaceData={getWorkspace.data} />
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
