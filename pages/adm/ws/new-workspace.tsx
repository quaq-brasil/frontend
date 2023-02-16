import { useRouter } from "next/router"
import { useUserAuth } from "../../../contexts/userAuth"
import CreateWorkspace from "../../../layouts/main/CreateWorkspace/CreateWorkspace"
import { useCreateWorkspace } from "../../../services/hooks/useWorkspace/useCreateWorkspace"
import { IUpdateWorkspace } from "../../../types/Workspace.type"
import { pageUrls } from "../../../utils/pagesUrl"

type CreateWorkspacePageProps = {
  workspaceId: string
  userId: string
}

export default function CreateWorkspacePage({
  workspaceId,
  userId,
}: CreateWorkspacePageProps) {
  const router = useRouter()

  const { user } = useUserAuth()

  const createWorkspace = useCreateWorkspace()

  function handleCreateWorkspace(data: IUpdateWorkspace) {
    createWorkspace.mutate(
      {
        data: {
          name: data.name || "",
          slug: data.name || "",
          avatar_url: data.avatar_url || "",
          user_id: user?.id,
          services: [{ name: "", description: "" }],
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
      initialUserData={user}
      handleCreateWorkspace={handleCreateWorkspace}
    />
  )
}
