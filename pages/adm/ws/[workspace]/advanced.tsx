import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import WorkspaceAdvanced from "../../../../layouts/main/WorkspaceAdvanced/WorkspaceAdvanced"
import { useWorkspaceBySlug } from "../../../../services/hooks/useWorkspace/useWorkspaceBySlug"
import { IWorkspace } from "../../../../types/Workspace.type"

type WorkspaceAdvancedPageProps = {
  workspace: string
}

export default function WorkspaceAdvancedPage({
  workspace,
}: WorkspaceAdvancedPageProps) {
  const getWorkspace = useWorkspaceBySlug({ slug: workspace })

  return (
    <WorkspaceAdvanced
      initialWorkspaceData={getWorkspace?.data as IWorkspace}
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
