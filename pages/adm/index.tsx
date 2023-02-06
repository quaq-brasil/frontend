import { useEffect, useState } from "react"
import { useUserAuth } from "../../contexts/userAuth"
import CreatorPage from "../../layouts/main/CreatorPage/CreatorPage"
import { useMutateGetAllWorkspacesByUserId } from "../../services/hooks/useWorkspace/useMutateGetAllWorkspacesByUserId"
import { IWorkspace } from "../../types/Workspace.type"

type AdmPageProps = {
  pageId: string
  workspaceId: string
}

export default function AdmPage({ pageId, workspaceId }: AdmPageProps) {
  const { user } = useUserAuth()

  const getAllWorkspaces = useMutateGetAllWorkspacesByUserId()

  const [workspaces, setWorkspaces] = useState<IWorkspace[]>()

  useEffect(() => {
    if (user) {
      getAllWorkspaces.mutate(
        {
          id: user.id as string,
        },
        {
          onSuccess: (data) => {
            setWorkspaces(data)
          },
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return <CreatorPage initialWorkspacesData={workspaces as IWorkspace[]} />
}
