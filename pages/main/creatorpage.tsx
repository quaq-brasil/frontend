import CreatorPage from "../../layouts/main/CreatorPage/CreatorPage"
import { usePage } from "../../services/hooks/usePage/usePage"
import { usePagesByWorkspace } from "../../services/hooks/usePage/usePagesByWorkspace"
import { useTemplatesByPageId } from "../../services/hooks/useTemplate/useTemplatesByPageId"
import { useWorkspace } from "../../services/hooks/useWorkspace/useWorkspace"
import { IPage } from "../../types/Page.type"
import { ITemplate } from "../../types/Template.type"
import { IWorkspace } from "../../types/Workspace.type"

type CreatorPagePageProps = {
  pageId: string
  workspaceId: string
}

export default function CreatorPagePage({
  pageId,
  workspaceId,
}: CreatorPagePageProps) {
  const getPage = usePage({
    id: "63b754987d02f98b8692255e",
  })

  const getTemplates = useTemplatesByPageId({ id: "63b754987d02f98b8692255e" })

  const getCurrentWorkspace = useWorkspace({ id: "63d68863688c6d9d82a5f648" })

  const getPagesByWorkspaces = usePagesByWorkspace({
    id: "63d68863688c6d9d82a5f648",
  })

  return (
    <CreatorPage
      initialPageData={getPage?.data as IPage}
      initialTemplatesData={getTemplates?.data as ITemplate[]}
      initialCurrentWorkspaceData={getCurrentWorkspace?.data as IWorkspace}
      initialPagesData={getPagesByWorkspaces?.data as IPage[]}
    />
  )
}
