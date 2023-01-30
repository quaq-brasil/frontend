import WorkspaceAdvanced from "../../layouts/main/WorkspaceAdvanced/WorkspaceAdvanced"
import { useWorkspace } from "../../services/hooks/useWorkspace/useWorkspace"
import { IWorkspace } from "../../types/Workspace.type"

type WorkspaceAdvancedPageProps = {
  workspaceId: string
}

export default function WorkspaceAdvancedPage({
  workspaceId,
}: WorkspaceAdvancedPageProps) {
  const getWorkspace = useWorkspace({ id: "63d68863688c6d9d82a5f648" })

  return (
    <WorkspaceAdvanced
      initialWorkspaceData={getWorkspace?.data as IWorkspace}
    />
  )
}
