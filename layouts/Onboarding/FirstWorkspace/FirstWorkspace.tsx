import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IUserPayload } from "types/Auth.types"
import { IUpdateWorkspace } from "types/Workspace.type"
import { pageUrls } from "utils/pagesUrl"
import { FirstWorkspaceContent } from "./FirstWorkspaceContent"

type FirstWorkspaceProps = {
  initialUserData: IUserPayload | null
  handleCreateWorkspace: (data: IUpdateWorkspace) => void
}

export function FirstWorkspace({
  handleCreateWorkspace,
  initialUserData,
}: FirstWorkspaceProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [userData, setUserData] = useState<IUserPayload | null>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)
  const [workspaceData, setWorkspaceData] = useState<IUpdateWorkspace>()

  useEffect(() => {
    setUserData(initialUserData)
  }, [initialUserData])

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleUpdateWorkspaceData(newData: IUpdateWorkspace) {
    setWorkspaceData((state) => {
      return {
        ...state,
        ...newData,
      } as IUpdateWorkspace
    })
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("createwspace:back")}
          onClick={() => router.push(pageUrls.adm())}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("createwspace:create")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("createwspace:back")}
          onClick={() => router.push(pageUrls.adm())}
        />,
      ]
    }
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      <Header
        background_url={
          "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag
          variant="img-txt"
          text={userData?.name || ""}
          img_url={userData?.avatar_url || ""}
        />
        {!workspaceData?.title && !workspaceData?.avatar_url && (
          <Tag variant="txt" text={text("createwspace:titletag")} />
        )}
        {workspaceData?.title && !workspaceData?.avatar_url && (
          <Tag variant="txt" text={workspaceData.title} />
        )}
        {!workspaceData?.title && workspaceData?.avatar_url && (
          <Tag variant="img" img_url={workspaceData.avatar_url} />
        )}
        {workspaceData?.title && workspaceData?.avatar_url && (
          <Tag
            variant="img-txt"
            text={workspaceData.title}
            img_url={workspaceData.avatar_url}
          />
        )}
      </Header>
      <FirstWorkspaceContent
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        isUpdating={isUpdating}
        handleUpdateWorkspaceData={handleUpdateWorkspaceData}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        runUpdate={runUpdate}
        handleCreateWorkspace={handleCreateWorkspace}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
