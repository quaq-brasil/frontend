import { CreatePage } from "../layouts/Onboarding/CreatePage/CreatePage"
import { useCreatePage } from "../services/hooks/usePage/useCreatePage"
import { useUser } from "../services/hooks/useUser/useUser"
import { useWorkspace } from "../services/hooks/useWorkspace/useWorkspace"

export default function CreatePagePage() {
  const userResponse = useUser({
    id: "63d26f06ea1e68c873e97ab2",
  })

  const workspaceResponse = useWorkspace({
    id: userResponse?.data.workspace_id
      ? userResponse?.data.workspace_id
      : "63b7543e7d02f98b8692255d",
  })

  const createPage = useCreatePage()

  const handleCreatePage = (
    name: string,
    url: string,
    avatar_url: string,
    background_url: string
  ) => {
    createPage.mutate({
      data: {
        name: name,
        url: url,
        workspace_id: userResponse?.data.workspace_id
          ? userResponse?.data.workspace_id
          : "63b7543e7d02f98b8692255d",
        avatar_url: avatar_url,
        background_url: background_url,
        is_stripe_active: false,
        stripe_id: "",
      },
    })
  }

  return (
    <CreatePage
      handleCreatePage={handleCreatePage}
      data={workspaceResponse?.data}
    />
  )
}
