import { useState } from "react"
import CreatorPage from "../../../layouts/main/CreatorPage/CreatorPage"
import { usePage } from "../../../services/hooks/usePage/usePage"
import { usePagesByWorkspace } from "../../../services/hooks/usePage/usePagesByWorkspace"
import { useTemplatesByPageId } from "../../../services/hooks/useTemplate/useTemplatesByPageId"
import { useWorkspace } from "../../../services/hooks/useWorkspace/useWorkspace"
import { useWorkspacesByUserId } from "../../../services/hooks/useWorkspace/useWorkspacesByUserId"
import { IPage } from "../../../types/Page.type"
import { ITemplate } from "../../../types/Template.type"
import { IWorkspace } from "../../../types/Workspace.type"

type AdmPageProps = {
  pageId: string
  workspaceId: string
}

export default function AdmPage({ pageId, workspaceId }: AdmPageProps) {
  const [currentPageId, setCurrentPageId] = useState("63b754987d02f98b8692255e")
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(
    "63d91e2cffbb3c0bab4e3a30"
  )

  function handleUpdateCurrentPageId(id: string) {
    setCurrentPageId(id)
  }

  function handleUpdateCurrentWorkspaceId(id: string) {
    console.log(id)
    setCurrentWorkspaceId(id)
  }

  const getPage = usePage({
    id: currentPageId,
  })

  const getTemplates = useTemplatesByPageId({ id: currentPageId })

  const getCurrentWorkspace = useWorkspace({ id: currentWorkspaceId })

  const getAllWorkspaces = useWorkspacesByUserId({
    id: "63d91dfba01035ef4040fe55",
  })

  const getPagesByWorkspaces = usePagesByWorkspace({
    id: currentWorkspaceId,
  })

  return (
    <CreatorPage
      initialPageData={getPage?.data as IPage}
      initialTemplatesData={getTemplates?.data as ITemplate[]}
      initialCurrentWorkspaceData={getCurrentWorkspace?.data as IWorkspace}
      initialPagesData={getPagesByWorkspaces?.data as IPage[]}
      initialAllWorkspacesData={getAllWorkspaces?.data}
      handleUpdateCurrentPageId={handleUpdateCurrentPageId}
      handleUpdateCurrentWorkspaceId={handleUpdateCurrentWorkspaceId}
    />
  )
}
