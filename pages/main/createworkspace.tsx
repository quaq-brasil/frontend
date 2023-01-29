import CreateWorkspace from "../../layouts/main/CreateWorkspace/CreateWorkspace"
import { useUser } from "../../services/hooks/useUser/useUser"
import { useCreateWorkspace } from "../../services/hooks/useWorkspace/useCreateWorkspace"
import { IUser } from "../../types/User.type"
import { IUpdateWorkspace } from "../../types/Workspace.type"

type CreateWorkspacePageProps = {
  workspaceId: string
  userId: string
}

export default function CreateWorkspacePage({
  workspaceId,
  userId,
}: CreateWorkspacePageProps) {
  const getUser = useUser({
    id: "63d68764688c6d9d82a5f647",
  })

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
      initialUserData={getUser?.data as IUser}
      handleCreateWorkspace={handleCreateWorkspace}
    />
  )
}
