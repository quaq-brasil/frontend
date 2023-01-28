import WorkspaceAdvanced from "../../layouts/main/WorkspaceAdvanced/WorkspaceAdvanced"
import { useWorkspace } from "../../services/hooks/useWorkspace/useWorkspace"
import { IWorkspace } from "../../types/Workspace.type"

type WorkspaceAdvancedPageProps = {
  workspaceId: string
}

export default function WorkspaceAdvancedPage({
  workspaceId,
}: WorkspaceAdvancedPageProps) {
  const getWorkspace = useWorkspace({ id: "63d58c208f9e0158905655cc" })

  return (
    <WorkspaceAdvanced
      initialWorkspaceData={getWorkspace?.data as IWorkspace}
    />
  )
}
