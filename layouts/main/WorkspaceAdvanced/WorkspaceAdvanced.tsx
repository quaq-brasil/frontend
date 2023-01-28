import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUpdateWorkspace, IWorkspace } from "../../../types/Workspace.type"
import { WorkspaceAdvancedContent } from "./WorkspaceAdvancedContent"

type WorkspaceAdvancedProps = {
  initialWorkspaceData: IWorkspace
}

export default function WorkspaceAdvanced({
  initialWorkspaceData,
}: WorkspaceAdvancedProps) {
  const text = useTranslation().t

  const [workspaceData, setWorkspaceData] = useState<IUpdateWorkspace>()

  useEffect(() => {
    setWorkspaceData(initialWorkspaceData)
  }, [initialWorkspaceData])

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("wsadvanced:tab1")}
        onClick={() => console.log("tab1")}
      />,
    ]
  }

  function loadHeader() {
    return (
      <Header
        background_url={
          "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag
          variant="img-txt"
          text={workspaceData?.name || ""}
          img_url={workspaceData?.avatar_url || ""}
        />
        <Tag variant="txt" text={text("wsadvanced:titletag")} />
        <Tag variant="txt" text={text("wsadvanced:titletag2")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <WorkspaceAdvancedContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
