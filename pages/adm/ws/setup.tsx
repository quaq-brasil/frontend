import { FirstWorkspace } from "layouts/Onboarding/FirstWorkspace/FirstWorkspace"
import { GetServerSideProps } from "next"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"
import { useRouter } from "next/router"
import { api } from "services/api"
import { useCreateWorkspace } from "services/hooks/useWorkspace/useCreateWorkspace"
import { IUserPayload } from "types/Auth.types"
import { IUpdateWorkspace } from "types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { pageUrls } from "utils/pagesUrl"
import { withAuth } from "utils/withAuth"

type FirstWorkspacePageProps = {
  data: IUserPayload
}

export default function FirstWorkspacePage({ data }: FirstWorkspacePageProps) {
  const text = useTranslation().t

  const router = useRouter()

  const createWorkspace = useCreateWorkspace()

  function handleCreateWorkspace(newData: IUpdateWorkspace) {
    createWorkspace.mutate(
      {
        data: {
          title: newData.title,
          slug: newData.slug,
          avatar_url: newData.avatar_url,
          services: [{ type: "", description: "" }],
          user_id: data.sub,
        },
      },
      {
        onSuccess: (data) => {
          router.push(pageUrls.createPage(data.slug))
        },
      }
    )
  }

  return (
    <>
      <Head>
        <title>{text("createwspace:pagetitle")}</title>
        <meta
          name="description"
          content={text("createwspace:pagedescription")}
        />
      </Head>
      <FirstWorkspace
        initialUserData={data}
        handleCreateWorkspace={handleCreateWorkspace}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    async function getUser({ cookies }: redirectNotFoundVerifyProps) {
      const { data } = await api.get("users", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return { data }
    }

    return await RedirectNotFoundVerify({
      func: getUser,
      ctx,
      cookies,
      payload,
    })
  }
)
