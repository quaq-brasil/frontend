import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IUpdateWorkspace } from "types/Workspace.type"
import { pageUrls } from "utils/pagesUrl"
import { WorkspaceServicesContent } from "./WorkspaceServicesContent"

type WorkspaceServicesProps = {
  initialWorkspaceData: IUpdateWorkspace | undefined
}

export function WorkspaceServices({
  initialWorkspaceData,
}: WorkspaceServicesProps) {
  const text = useTranslation().t

  const [workspaceData, setWorkspaceData] =
    useState<IUpdateWorkspace>(initialWorkspaceData)

  useEffect(() => {
    setWorkspaceData(initialWorkspaceData)
  }, [initialWorkspaceData])

  const router = useRouter()

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("wssettings:back")}
        onClick={() =>
          router.push(
            pageUrls.workspaceSettings({ workspaceSlug: workspaceData.slug })
          )
        }
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
          text={workspaceData?.title || ""}
          img_url={workspaceData?.avatar_url || ""}
        />
        <Tag
          variant="txt"
          text={text("wssettings:settings")}
          onClick={() =>
            router.push(
              pageUrls.workspaceSettings({
                workspaceSlug: workspaceData?.slug,
              })
            )
          }
        />
        <Tag variant="txt" text={text("wssettings:services")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <WorkspaceServicesContent workspaceData={workspaceData} />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
