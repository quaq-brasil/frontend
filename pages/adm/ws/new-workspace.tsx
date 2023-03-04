import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import CreateWorkspace from "../../../layouts/main/CreateWorkspace/CreateWorkspace"
import { useCreateWorkspace } from "../../../services/hooks/useWorkspace/useCreateWorkspace"
import { IUserPayload } from "../../../types/Auth.types"
import { IUpdateWorkspace } from "../../../types/Workspace.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../../utils/404Redirect"
import { pageUrls } from "../../../utils/pagesUrl"
import { withAuth } from "../../../utils/withAuth"

type CreateWorkspacePageProps = {
  data: IUserPayload
}

export default function CreateWorkspacePage({
  data,
}: CreateWorkspacePageProps) {
  const router = useRouter()

  // const getUser = useUser({
  //   options: {
  //     initialData: data,
  //   },
  // })

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
    <CreateWorkspace
      initialUserData={data}
      handleCreateWorkspace={handleCreateWorkspace}
    />
  )
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    async function getUser({ cookies }: redirectNotFoundVerifyProps) {
      return { data: payload }
    }

    return await RedirectNotFoundVerify(getUser, ctx, cookies, payload)
  }
)
