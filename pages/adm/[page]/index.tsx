import { CreatorPage } from "layouts/main/CreatorPage/CreatorPage"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { useState } from "react"
import { api } from "services/api"
import { usePageBySlug } from "services/hooks/usePage/usePageBySlug"
import { useWorkspacesByUserId } from "services/hooks/useWorkspace/useWorkspacesByUserId"
import { IUserPayload } from "types/Auth.types"
import { IPage } from "types/Page.type"
import { IWorkspace } from "types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

type AdmSelectedPageProps = {
  workspacesData: IWorkspace[]
  payload: IUserPayload
  pageSlug: string
  pageData: IPage
}

export default function AdmSelectedPage({
  workspacesData,
  payload,
  pageSlug,
  pageData,
}: AdmSelectedPageProps) {
  const getWorkspaces = useWorkspacesByUserId({
    id: payload.sub,
    options: {
      initialData: workspacesData,
    },
  })

  const getCurrentPage = usePageBySlug({
    slug: pageSlug,
    options: { initialData: pageData },
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
        initialWorkspacesData={getWorkspaces?.data}
        initialCurrentPageData={getCurrentPage?.data}
        payload={payload}
        handleUpdatePageTitle={handleUpdatePageTitle}
      />
    </>
  )
}

type Params = {
  page: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: { params: Params }, cookies: any, payload: any) => {
    const { page } = ctx.params

    async function getWorkspacesAndCurrentPage({
      cookies,
    }: redirectNotFoundVerifyProps) {
      const { data: workspacesData } = await api.get(
        `/workspaces/user/${payload.sub}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      const { data: pageData } = await api.get(`/pages/slug/${page}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return {
        workspacesData: [...workspacesData],
        pageData: { pageData },
        payload,
        pageSlug: page,
      }
    }

    return await RedirectNotFoundVerify(
      getWorkspacesAndCurrentPage,
      ctx,
      cookies,
      payload
    )
  }
)
