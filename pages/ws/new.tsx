import { useUserAuth } from "../../contexts/userAuth"
import CreateWorkspace from "../../layouts/main/CreateWorkspace/CreateWorkspace"
import { useCreateWorkspace } from "../../services/hooks/useWorkspace/useCreateWorkspace"
import { IUpdateWorkspace } from "../../types/Workspace.type"

type CreateWorkspacePageProps = {
  workspaceId: string
  userId: string
}

export default function CreateWorkspacePage({
  workspaceId,
  userId,
}: CreateWorkspacePageProps) {
  const { user } = useUserAuth()

  const createWorkspace = useCreateWorkspace()

  function handleCreateWorkspace(data: IUpdateWorkspace) {
    createWorkspace.mutate({
      data: {
        name: data.name || "",
        avatar_url: data.avatar_url || "",
        user_id: "63d68764688c6d9d82a5f647",
        services: [{ name: "", description: "" }],
      },
    })
  }

  return (
    <CreateWorkspace
      initialUserData={user}
      handleCreateWorkspace={handleCreateWorkspace}
    />
  )
}
