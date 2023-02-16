import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUser } from "../../../types/User.type"
import { IUpdateWorkspace } from "../../../types/Workspace.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { CreateWorkspaceContent } from "./CreateWorkspaceContent"

type CreateWorkspaceProps = {
  initialUserData: IUser | null
  handleCreateWorkspace: (data: IUpdateWorkspace) => void
}

export default function CreateWorkspace({
  initialUserData,
  handleCreateWorkspace,
}: CreateWorkspaceProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [userData, setUserData] = useState<IUser | null>()
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
    handleUpdateIsUpdating(true)
  }

  useEffect(() => {
    if (workspaceData) {
      handleCreateWorkspace(workspaceData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

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

  function loadHeader() {
    return (
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
        {!workspaceData?.name && !workspaceData?.avatar_url && (
          <Tag variant="txt" text={text("createwspace:titletag")} />
        )}
        {workspaceData?.name && !workspaceData?.avatar_url && (
          <Tag variant="txt" text={workspaceData.name} />
        )}
        {!workspaceData?.name && workspaceData?.avatar_url && (
          <Tag variant="img" img_url={workspaceData.avatar_url} />
        )}
        {workspaceData?.name && workspaceData?.avatar_url && (
          <Tag
            variant="img-txt"
            text={workspaceData.name}
            img_url={workspaceData.avatar_url}
          />
        )}
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CreateWorkspaceContent
        isUpdating={isUpdating}
        handleUpdateWorkspaceData={handleUpdateWorkspaceData}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
