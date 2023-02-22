import { useRouter } from "next/router"
import { useUserAuth } from "../../../contexts/userAuth"
import FirstWorkspace from "../../../layouts/Onboarding/FirstWorkspace/FirstWorkspace"
import { useCreateWorkspace } from "../../../services/hooks/useWorkspace/useCreateWorkspace"
import { IUpdateWorkspace } from "../../../types/Workspace.type"
import { pageUrls } from "../../../utils/pagesUrl"

export default function FirstWorkspacePage() {
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
    <FirstWorkspace
      initialUserData={user}
      handleCreateWorkspace={handleCreateWorkspace}
    />
  )
}
