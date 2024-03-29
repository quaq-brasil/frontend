import { CreateWorkspace } from "layouts/main/CreateWorkspace/CreateWorkspace"
import { GetServerSideProps } from "next"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"
import { useRouter } from "next/router"
import { useCreateWorkspace } from "services/hooks/useWorkspace/useCreateWorkspace"
import { IUserPayload } from "types/Auth.types"
import { IUpdateWorkspace } from "types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { pageUrls } from "utils/pagesUrl"
import { withAuth } from "utils/withAuth"

type CreateWorkspacePageProps = {
  data: IUserPayload
}

export default function CreateWorkspacePage({
  data,
}: CreateWorkspacePageProps) {
  const text = useTranslation().t

  const router = useRouter()

  const createWorkspace = useCreateWorkspace()

  function handleCreateWorkspace(newData: IUpdateWorkspace) {
    createWorkspace.mutate(
      {
        data: {
          title: newData.title,
          slug: newData.title,
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
      <CreateWorkspace
        initialUserData={data}
        handleCreateWorkspace={handleCreateWorkspace}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    async function getUser({ cookies }: redirectNotFoundVerifyProps) {
      return { data: payload }
    }

    return await RedirectNotFoundVerify({
      func: getUser,
      ctx,
      cookies,
      payload,
    })
  }
)
