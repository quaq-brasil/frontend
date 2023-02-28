import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import CreateWorkspace from "../../../layouts/main/CreateWorkspace/CreateWorkspace"
import { api } from "../../../services/api"
import { useUser } from "../../../services/hooks/useUser/useUser"
import { useCreateWorkspace } from "../../../services/hooks/useWorkspace/useCreateWorkspace"
import { IUser } from "../../../types/User.type"
import { IUpdateWorkspace } from "../../../types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../utils/404Redirect"
import { pageUrls } from "../../../utils/pagesUrl"
import { withAuth } from "../../../utils/withAuth"

type CreateWorkspacePageProps = {
  data: IUser
}

export default function CreateWorkspacePage({
  data,
}: CreateWorkspacePageProps) {
  const router = useRouter()

  const getUser = useUser({
    options: {
      initialData: data,
    },
  })

  const createWorkspace = useCreateWorkspace()

  function handleCreateWorkspace(data: IUpdateWorkspace) {
    createWorkspace.mutate(
      {
        data: {
          title: data.title,
          slug: data.title,
          avatar_url: data.avatar_url,
          user_id: getUser.data.id,
          services: [{ type: "", description: "" }],
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
    <CreateWorkspace
      initialUserData={getUser.data}
      handleCreateWorkspace={handleCreateWorkspace}
    />
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

      return data
    }

    return await RedirectNotFoundVerify(getUser, ctx, cookies, payload)
  }
)
