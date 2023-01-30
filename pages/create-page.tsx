import { CreatePage } from "../layouts/Onboarding/CreatePage/CreatePage"
import { useCreatePage } from "../services/hooks/usePage/useCreatePage"
import { useUser } from "../services/hooks/useUser/useUser"
import { useWorkspace } from "../services/hooks/useWorkspace/useWorkspace"
import { IUpdatePage } from "../types/Page.type"

export default function CreatePagePage() {
  const userResponse = useUser({
    id: "63d26f06ea1e68c873e97ab2",
  })

  const workspaceResponse = useWorkspace({
    id: userResponse?.data.workspace_id
      ? userResponse?.data.workspace_id
      : "63d68863688c6d9d82a5f648",
  })

  const createPage = useCreatePage()

  const handleCreatePage = (data: IUpdatePage) => {
    createPage.mutate({
      data: {
        name: data.name || "",
        url: data.url || "",
        description: data.description || "",
        workspace_id: userResponse?.data.workspace_id
          ? userResponse?.data.workspace_id
          : "63b7543e7d02f98b8692255d",
        avatar_url: data.avatar_url || "",
        background_url: data.background_url || "",
        is_stripe_active: false,
        stripe_id: "",
        trackers: {},
      },
    })
  }

  return (
    <CreatePage
      handleCreatePage={handleCreatePage}
      initialWorkspaceData={workspaceResponse?.data}
    />
  )
}
