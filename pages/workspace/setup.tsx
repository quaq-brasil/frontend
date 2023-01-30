import WorkspaceSetup from "../../layouts/Onboarding/WorkspaceSetup/WorkspaceSetup"
import { useUser } from "../../services/hooks/useUser/useUser"
import { useCreateWorkspace } from "../../services/hooks/useWorkspace/useCreateWorkspace"

export default function WorkspaceSetupPage() {
  const userResponse = useUser({
    id: "63d26f06ea1e68c873e97ab2",
  })

  const createWorkspace = useCreateWorkspace()

  const handleCreateWorkspace = (name: string, avatar_url: string) => {
    createWorkspace.mutate({
      data: {
        name: name,
        avatar_url: avatar_url,
        services: [
          {
            name: "free",
            description: "free workspace",
          },
        ],
      },
    })
  }

  return (
    <WorkspaceSetup
      data={userResponse?.data}
      handleCreateWorkspace={handleCreateWorkspace}
    />
  )
}
