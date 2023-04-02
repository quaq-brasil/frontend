import { WorkspaceSettings } from "layouts/main/WorkspaceSettings/WorkspaceSettings"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { api } from "services/api"
import { useUpdateWorkspace } from "services/hooks/useWorkspace/useUpdateWorkspace"
import { useWorkspaceBySlug } from "services/hooks/useWorkspace/useWorkspaceBySlug"
import { IUpdateWorkspace, IWorkspace } from "types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

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
    updateWorkspace.mutate(
      {
        id: getWorkspace.data.id,
        data: {
          avatar_url: data.avatar_url,
          title: data.title,
        },
      },
      {
        onSuccess(data) {
          setLocalWorkspaceData(data)
        },
      }
    )
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
      <WorkspaceSettings
        initialWorkspaceData={localWorkspaceData}
        handleUpdateWorkspace={handleUpdateWorkspace}
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
