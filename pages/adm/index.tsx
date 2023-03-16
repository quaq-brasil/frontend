import { CreatorPage } from "layouts/main/CreatorPage/CreatorPage"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useState } from "react"
import { api } from "services/api"
import { useWorkspacesByUserId } from "services/hooks/useWorkspace/useWorkspacesByUserId"
import { IUserPayload } from "types/Auth.types"
import { IWorkspace } from "types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

type AdmPageProps = {
  workspaces: IWorkspace[]
  payload: IUserPayload
}

export default function AdmPage({ workspaces, payload }: AdmPageProps) {
  const getWorkspaces = useWorkspacesByUserId({
    id: payload.sub,
    options: {
      initialData: workspaces,
    },
  })

  type PageInfoProps = {
    title: string
    description: string
  }

  const [pageInfo, setPageInfo] = useState<PageInfoProps | null>(null)

  function handleUpdatePageTitle(newInfo: PageInfoProps) {
    setPageInfo((state) => {
      return {
        ...state,
        ...newInfo,
      } as PageInfoProps
    })
  }

  return (
    <>
      <Head>
        <title>{pageInfo?.title}</title>
        <meta name="description" content={pageInfo?.description} />
      </Head>
      <CreatorPage
        initialWorkspacesData={getWorkspaces.data}
        payload={payload}
        handleUpdatePageTitle={handleUpdatePageTitle}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    async function getWorkspaces({ cookies }: redirectNotFoundVerifyProps) {
      const { data } = await api.get(`/workspaces/user/${payload.sub}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return {
        workspaces: [...data],
        payload,
      }
    }

    return await RedirectNotFoundVerify(getWorkspaces, ctx, cookies, payload)
  }
)
