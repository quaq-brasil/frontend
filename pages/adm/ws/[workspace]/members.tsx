import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import WorkspaceMembers from "../../../../layouts/main/WorkspaceMembers/WorkspaceMembers"
import { useUpdateWorkspace } from "../../../../services/hooks/useWorkspace/useUpdateWorkspace"
import { useWorkspaceBySlug } from "../../../../services/hooks/useWorkspace/useWorkspaceBySlug"
import { IUpdateWorkspace } from "../../../../types/Workspace.type"

type WorkspaceMembersPageProps = {
  workspace: string
}

export default function WorkspaceMembersPage({
  workspace,
}: WorkspaceMembersPageProps) {
  const getWorkspace = useWorkspaceBySlug({ slug: workspace })

  const updateWorkspace = useUpdateWorkspace()

  function handleUpdateWorkspace(data: IUpdateWorkspace) {
    updateWorkspace.mutate({
      id: getWorkspace?.data.id || "",
      data: {
        title: data?.title || "",
        avatar_url: data.avatar_url || "",
      },
    })
  }

  return (
    <WorkspaceMembers
      initialWorkspaceData={getWorkspace?.data}
      handleUpdateWorkspace={handleUpdateWorkspace}
    />
  )
}

type Params = {
  workspace: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { workspace } = params as Params

  return {
    props: {
      workspace,
    },
  }
}
