import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { useUserAuth } from "../../../../contexts/userAuth"
import WorkspaceDelete from "../../../../layouts/main/WorkspaceDelete/WorkspaceDelete"
import { useDeleteWorkspace } from "../../../../services/hooks/useWorkspace/useDeleteWorkspace"
import { useWorkspaceBySlug } from "../../../../services/hooks/useWorkspace/useWorkspaceBySlug"
import { IWorkspace } from "../../../../types/Workspace.type"

type WorkspaceDeletePageProps = {
  workspace: string
}

export default function WorkspaceDeletePage({
  workspace,
}: WorkspaceDeletePageProps) {
  const { user } = useUserAuth()

  const getWorkspace = useWorkspaceBySlug({ slug: workspace })

  const deleteWorkspace = useDeleteWorkspace()

  function handleDeleteWorkspace() {
    deleteWorkspace.mutate({ id: getWorkspace?.data.id as string })
  }

  return (
    <WorkspaceDelete
      initialWorkspaceData={getWorkspace?.data as IWorkspace}
      initialUserData={user}
      handleDeleteWorkspace={handleDeleteWorkspace}
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
