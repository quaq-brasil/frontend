import { CreatePage } from "layouts/Onboarding/CreatePage/CreatePage"
import { GetServerSideProps } from "next"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { api } from "services/api"
import { useCreatePage } from "services/hooks/usePage/useCreatePage"
import { useWorkspaceBySlug } from "services/hooks/useWorkspace/useWorkspaceBySlug"
import { IUpdatePage } from "types/Page.type"
import { IWorkspace } from "types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { pageUrls } from "utils/pagesUrl"
import { withAuth } from "utils/withAuth"

type CreatePagePagePros = {
  workspaceData: IWorkspace
  workspaceSlug: string
}

export default function CreatePagePage({
  workspaceData,
  workspaceSlug,
}: CreatePagePagePros) {
  const text = useTranslation().t

  const getWorkspace = useWorkspaceBySlug({
    slug: workspaceSlug,
    options: { initialData: workspaceData },
  })

  const createPage = useCreatePage()

  const router = useRouter()

  const handleCreatePage = (data: IUpdatePage) => {
    createPage.mutate(
      {
        data: {
          title: data.title,
          slug: data.slug,
          description: data.description,
          workspace_id: getWorkspace.data.id,
          avatar_url: data.avatar_url,
          background_url: data.background_url,
          services: {},
          trackers: {},
        },
      },
      {
        onSuccess: (pageData) => {
          const { slug } = pageData
          router.push(pageUrls.pageSettings({ pageSlug: slug }))
        },
      }
    )
  }

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
        <title>{`${workspaceTitle}`}</title>
        <meta
          name="description"
          content={text("createpage:pagedescription1")}
        />
      </Head>
      <CreatePage
        handleCreatePage={handleCreatePage}
        initialWorkspaceData={getWorkspace?.data}
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
        workspacesData: { data },
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
