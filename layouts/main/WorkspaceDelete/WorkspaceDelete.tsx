import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUser } from "../../../types/User.type"
import { IUpdateWorkspace, IWorkspace } from "../../../types/Workspace.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { WorkspaceDeleteContent } from "./WorkspaceDeleteContent"

type WorkspaceDeleteProps = {
  initialWorkspaceData: IWorkspace | undefined
  handleDeleteWorkspace: () => void
  initialUserData: IUser | null
}

export default function WorkspaceDelete({
  initialWorkspaceData,
  handleDeleteWorkspace,
  initialUserData,
}: WorkspaceDeleteProps) {
  const text = useTranslation().t

  const [workspaceData, setWorkspaceData] = useState<IUpdateWorkspace>()
  const [userData, setUserData] = useState<IUser | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  useEffect(() => {
    setWorkspaceData(initialWorkspaceData)
  }, [initialWorkspaceData])

  useEffect(() => {
    setUserData(initialUserData)
  }, [initialUserData])

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  const router = useRouter()

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("wsdelete:back")}
          onClick={() =>
            router.push(
              pageUrls.workspaceSettings({
                settings: "advanced",
                woskpaceSlug: workspaceData?.slug,
              })
            )
          }
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("wsdelete:update")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("wsdelete:back")}
          onClick={() =>
            router.push(
              pageUrls.workspaceSettings({
                settings: "advanced",
                woskpaceSlug: workspaceData?.slug,
              })
            )
          }
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
          onClick={() =>
            router.push(
              pageUrls.workspaceSettings({ woskpaceSlug: workspaceData?.slug })
            )
          }
        />
        <Tag
          variant="txt"
          text={text("wsdelete:settings")}
          onClick={() =>
            router.push(
              pageUrls.workspaceSettings({ woskpaceSlug: workspaceData?.slug })
            )
          }
        />
        <Tag
          variant="txt"
          text={text("wsdelete:advanced")}
          onClick={() =>
            router.push(
              pageUrls.workspaceSettings({
                woskpaceSlug: workspaceData?.slug,
                settings: "advanced",
              })
            )
          }
        />
        <Tag variant="txt" text={text("wsdelete:delete")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <WorkspaceDeleteContent
        isUpdating={isUpdating}
        runUpdate={runUpdate}
        userData={userData}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        handleDeleteWorkspace={handleDeleteWorkspace}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
