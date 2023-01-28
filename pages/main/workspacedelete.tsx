import WorkspaceDelete from "../../layouts/main/WorkspaceDelete/WorkspaceDelete"
import { useDeleteWorkspace } from "../../services/hooks/useWorkspace/useDeleteWorkspace"
import { useWorkspace } from "../../services/hooks/useWorkspace/useWorkspace"
import { IWorkspace } from "../../types/Workspace.type"

type WorkspaceDeletePageProps = {
  workspaceId: string
}

export default function WorkspaceDeletePage({
  workspaceId,
}: WorkspaceDeletePageProps) {
  const getWorkspace = useWorkspace({ id: "63d58c208f9e0158905655cc" })

  const deleteWorkspace = useDeleteWorkspace({ id: "63d58c208f9e0158905655cc" })

  function handleDeleteWorkspace() {
    deleteWorkspace.mutate()
  }

  return (
    <WorkspaceDelete
      initialWorkspaceData={getWorkspace?.data as IWorkspace}
      handleDeleteWorkspace={handleDeleteWorkspace}
    />
  )
}
