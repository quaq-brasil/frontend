import { HireServicePage } from "layouts/main/HireServicePage/HireServicePage"
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

type HireServiceProps = {
  workspaceData: IWorkspace
  workspaceSlug: string
  serviceSlug: string
}

export default function HireService({
  workspaceData,
  workspaceSlug,
}: HireServiceProps) {
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
  const [localServiceData, setLocalServiceData] = useState({
    title: "service example",
    description: "service example description",
    options: [
      {
        title: "option A",
        description: "option A description",
        price: 100.5,
        subscribed: true,
      },
      {
        title: "option B",
        description: "option B description",
        price: 123.45,
        subscribed: false,
      },
    ],
  })
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
      <HireServicePage
        initialWorkspaceData={localWorkspaceData}
        initialServiceData={localServiceData}
      />
    </>
  )
}

type Params = {
  workspace: string
  service: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: { params: Params }, cookies: any, payload: any) => {
    const { workspace, service } = ctx.params

    async function getWorkspace({ cookies }: redirectNotFoundVerifyProps) {
      const { data } = await api.get(`/workspaces/slug/${workspace}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return {
        workspaceData: { data },
        workspaceSlug: workspace,
        serviceSlug: service,
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
