import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUpdateWorkspace } from "../../../types/Workspace.type"
import { WorkspaceSettingsContent } from "./WorkspaceSettingsContent"

type WorkspaceSettingsProps = {
  initialWorkspaceData: IUpdateWorkspace | undefined
  handleUpdateWorkspace: (data: IUpdateWorkspace) => void
}

export default function WorkspaceSettings({
  handleUpdateWorkspace,
  initialWorkspaceData,
}: WorkspaceSettingsProps) {
  const text = useTranslation().t

  const [workspaceData, setWorkspaceData] = useState<IUpdateWorkspace>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  useEffect(() => {
    setWorkspaceData(initialWorkspaceData)
  }, [initialWorkspaceData])

  function handleUpdateWorkspaceData(newData: IUpdateWorkspace) {
    setWorkspaceData({
      ...workspaceData,
      name: newData.name || workspaceData?.name,
      avatar_url: newData.avatar_url || workspaceData?.avatar_url,
    })
    handleUpdateIsUpdating(true)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  const router = useRouter()

  useEffect(() => {
    if (workspaceData) {
      handleUpdateWorkspace(workspaceData)
      handleUpdateIsUpdating(false)
      handleUpdateRunUpdate(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("wssettings:back")}
          onClick={() => console.log()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("wssettings:update")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("wssettings:back")}
          onClick={() => console.log()}
        />,
      ]
    }
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
        <Tag
          variant="txt"
          text={text("wssettings:settings")}
          onClick={() => console.log()}
        />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <WorkspaceSettingsContent
        handleUpdateWorkspaceData={handleUpdateWorkspaceData}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        workspaceData={workspaceData}
        isUpdating={isUpdating}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}