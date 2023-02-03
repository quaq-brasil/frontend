import { useUserAuth } from "../../contexts/userAuth"
import WorkspaceSetup from "../../layouts/Onboarding/WorkspaceSetup/WorkspaceSetup"
import { useCreateWorkspace } from "../../services/hooks/useWorkspace/useCreateWorkspace"

export default function WorkspaceSetupPage() {
  const { user } = useUserAuth()

  const createWorkspace = useCreateWorkspace()

  const handleCreateWorkspace = (name: string, avatar_url: string) => {
    createWorkspace.mutate({
      data: {
        name: name,
        user_id: "1",
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
    <WorkspaceSetup data={user} handleCreateWorkspace={handleCreateWorkspace} />
  )
}
