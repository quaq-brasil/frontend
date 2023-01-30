import { useState } from "react"
import CreatorPage from "../../../layouts/main/CreatorPage/CreatorPage"
import { usePage } from "../../../services/hooks/usePage/usePage"
import { usePagesByWorkspace } from "../../../services/hooks/usePage/usePagesByWorkspace"
import { useTemplatesByPageId } from "../../../services/hooks/useTemplate/useTemplatesByPageId"
import { useWorkspace } from "../../../services/hooks/useWorkspace/useWorkspace"
import { IPage } from "../../../types/Page.type"
import { ITemplate } from "../../../types/Template.type"
import { IWorkspace } from "../../../types/Workspace.type"

type AdmPageProps = {
  pageId: string
  workspaceId: string
}

export default function AdmPage({ pageId, workspaceId }: AdmPageProps) {
  const [currentPageId, setCurrentPageId] = useState("63b754987d02f98b8692255e")

  function handleUpdateCurrentPageId(id: string) {
    setCurrentPageId(id)
  }

  const getPage = usePage({
    id: currentPageId,
  })

  const getTemplates = useTemplatesByPageId({ id: currentPageId })

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
      handleUpdateCurrentPageId={handleUpdateCurrentPageId}
    />
  )
}
