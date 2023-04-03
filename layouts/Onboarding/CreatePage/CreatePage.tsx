import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IUpdatePage } from "types/Page.type"
import { IUpdateWorkspace, IWorkspace } from "types/Workspace.type"
import { pageUrls } from "utils/pagesUrl"
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
  const router = useRouter()

  const [pageData, setPageData] = useState<IUpdatePage>()
  const [workspaceData, setWorkspaceData] = useState<IUpdateWorkspace>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  useEffect(() => {
    setWorkspaceData(initialWorkspaceData)
  }, [initialWorkspaceData])

  function handleUpdatePageData(newData: IUpdatePage) {
    setPageData((state) => {
      return {
        ...state,
        ...newData,
      } as IUpdatePage
    })
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("createpage:back")}
          onClick={() => router.back()}
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
          onClick={() => router.push(pageUrls.adm())}
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
          text={workspaceData?.title || ""}
          img_url={workspaceData?.avatar_url || ""}
        />
        {!pageData?.title && !pageData?.avatar_url && (
          <Tag variant="txt" text={text("createpage:titletag")} />
        )}
        {pageData?.title && !pageData?.avatar_url && (
          <Tag variant="txt" text={pageData?.title} />
        )}
        {pageData?.title && pageData?.avatar_url && (
          <Tag
            variant="img-txt"
            text={pageData?.title}
            img_url={pageData.avatar_url}
          />
        )}
        {!pageData?.title && pageData?.avatar_url && (
          <Tag variant="img" img_url={pageData.avatar_url} />
        )}
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CreatePageContent
        handleUpdatePageData={handleUpdatePageData}
        isUpdating={isUpdating}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        pageData={pageData}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        handleCreatePage={handleCreatePage}
        runUpdate={runUpdate}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
