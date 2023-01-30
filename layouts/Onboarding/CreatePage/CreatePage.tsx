import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUpdatePage } from "../../../types/Page.type"
import { IUpdateWorkspace, IWorkspace } from "../../../types/Workspace.type"
import { CreatePageContent } from "./CreatePageContent"

type CreatePageProps = {
  initialWorkspaceData?: IWorkspace
  handleCreatePage: (data: IUpdatePage) => void
}

export function CreatePage({
  initialWorkspaceData,
  handleCreatePage,
}: CreatePageProps) {
  const text = useTranslation().t

  const [pageData, setPageData] = useState<IUpdatePage>()
  const [workspaceData, setWorkspaceData] = useState<IUpdateWorkspace>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  useEffect(() => {
    setWorkspaceData(initialWorkspaceData)
  }, [initialWorkspaceData])

  function handleUpatePageData(newData: IUpdatePage) {
    setPageData({
      ...pageData,
      name: newData.name || pageData?.name,
      avatar_url: newData.avatar_url || pageData?.avatar_url,
      background_url: newData.background_url || pageData?.background_url,
      description: newData.description || pageData?.description,
      url: newData.url || pageData?.url,
    })
    handleUpdateIsUpdating(true)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  useEffect(() => {
    if (pageData) {
      handleCreatePage(pageData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("createpage:back")}
          onClick={() => console.log("back")}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("createpage:update")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("createpage:back")}
          onClick={() => handleUpdateRunUpdate(true)}
        />,
      ]
    }
  }

  function loadHeader() {
    return (
      <Header
        background_url={
          pageData?.background_url ||
          "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag
          variant="img-txt"
          text={workspaceData?.name || ""}
          img_url={workspaceData?.avatar_url || ""}
        />
        {!pageData?.name && !pageData?.avatar_url && (
          <Tag variant="txt" text={text("createpage:titletag")} />
        )}
        {pageData?.name && !pageData?.avatar_url && (
          <Tag variant="txt" text={pageData?.name} />
        )}
        {pageData?.name && pageData?.avatar_url && (
          <Tag
            variant="img-txt"
            text={pageData?.name}
            img_url={pageData.avatar_url}
          />
        )}
        {!pageData?.name && pageData?.avatar_url && (
          <Tag variant="img" img_url={pageData.avatar_url} />
        )}
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CreatePageContent
        handleUpatePageData={handleUpatePageData}
        isUpdating={isUpdating}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
