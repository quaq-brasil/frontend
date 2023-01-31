import WorkspaceSettings from "../../../layouts/main/WorkspaceSettings/WorkspaceSettings"
import { useUpdateWorkspace } from "../../../services/hooks/useWorkspace/useUpdateWorkspace"
import { useWorkspace } from "../../../services/hooks/useWorkspace/useWorkspace"
import { IUpdateWorkspace } from "../../../types/Workspace.type"

export default function WorkspaceSettingsPage() {
  const getWorkspace = useWorkspace({ id: "63d91e6acf6a7076d3a019ee" })

  const updateWorkspace = useUpdateWorkspace()

  function handleUpdateWorkspace(data: IUpdateWorkspace) {
    updateWorkspace.mutate({
      id: "63d91e6acf6a7076d3a019ee",
      data: {
        name: data?.name || "",
        avatar_url: data.avatar_url || "",
      },
    })
  }

  return (
    <WorkspaceSettings
      initialWorkspaceData={getWorkspace?.data}
      handleUpdateWorkspace={handleUpdateWorkspace}
    />
  )
}
