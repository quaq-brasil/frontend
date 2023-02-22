import { useRouter } from "next/router"
import { useUserAuth } from "../../../contexts/userAuth"
import CreateWorkspace from "../../../layouts/main/CreateWorkspace/CreateWorkspace"
import { useCreateWorkspace } from "../../../services/hooks/useWorkspace/useCreateWorkspace"
import { IUpdateWorkspace } from "../../../types/Workspace.type"
import { pageUrls } from "../../../utils/pagesUrl"

export default function CreateWorkspacePage() {
  const router = useRouter()

  const { user } = useUserAuth()

  const createWorkspace = useCreateWorkspace()

  function handleCreateWorkspace(data: IUpdateWorkspace) {
    createWorkspace.mutate(
      {
        data: {
          title: data.title || "",
          slug: data.title || "",
          avatar_url: data.avatar_url || "",
          user_id: user?.id,
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
      initialUserData={user}
      handleCreateWorkspace={handleCreateWorkspace}
    />
  )
}
