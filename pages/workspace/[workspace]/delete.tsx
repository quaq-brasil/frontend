import WorkspaceDelete from "../../../layouts/main/WorkspaceDelete/WorkspaceDelete"
import { useUser } from "../../../services/hooks/useUser/useUser"
import { useDeleteWorkspace } from "../../../services/hooks/useWorkspace/useDeleteWorkspace"
import { useWorkspace } from "../../../services/hooks/useWorkspace/useWorkspace"
import { IUser } from "../../../types/User.type"
import { IWorkspace } from "../../../types/Workspace.type"

type WorkspaceDeletePageProps = {
  workspaceId: string
  userId: string
}

export default function WorkspaceDeletePage({
  workspaceId,
  userId,
}: WorkspaceDeletePageProps) {
  const getUser = useUser({
    id: "63d7c5dd4b1d81503bf6beb8",
  })

  const getWorkspace = useWorkspace({ id: "63d7cbf14b1d81503bf6bebd" })

  const deleteWorkspace = useDeleteWorkspace({ id: "63d7cbf14b1d81503bf6bebd" })

  function handleDeleteWorkspace() {
    deleteWorkspace.mutate()
  }

  return (
    <WorkspaceDelete
      initialWorkspaceData={getWorkspace?.data as IWorkspace}
      initialUserData={getUser?.data as IUser}
      handleDeleteWorkspace={handleDeleteWorkspace}
    />
  )
}
