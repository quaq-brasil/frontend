import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import {
  ArrowsCounterClockwise,
  ArrowsLeftRight,
  GearSix,
  MagnifyingGlass,
  Plus,
  UserCircle,
} from "phosphor-react"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { useContextMenu } from "../../../hooks/ContextMenuHook"
import { useMutatePagesByWorkspaceId } from "../../../services/hooks/usePage/useMutatePagesByWorkspaceId"
import { useMutateTemplatesByPageId } from "../../../services/hooks/useTemplate/useMutateTemplatesByPageId"
import { IPage } from "../../../types/Page.type"
import { ITemplate } from "../../../types/Template.type"
import { IWorkspace } from "../../../types/Workspace.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { CreatorPageContent } from "./CreatorPageContent"

type CreatorPageProps = {
  initialWorkspacesData: IWorkspace[]
  initalCurrentPageData?: IPage
}

export default function CreatorPage({
  initialWorkspacesData,
  initalCurrentPageData,
}: CreatorPageProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [workspaces, setWorkspaces] = useState<IWorkspace[]>()
  const [currentWorkspace, setCurrentWorkspace] = useState<IWorkspace>()

  useEffect(() => {
    if (initialWorkspacesData) {
      setWorkspaces([...initialWorkspacesData])
      setCurrentWorkspace(initialWorkspacesData[0])
    }
  }, [initialWorkspacesData])

  const getPages = useMutatePagesByWorkspaceId()

  const [pages, setPages] = useState<IPage[]>()
  const [currentPage, setCurrentPage] = useState<IPage>()

  useEffect(() => {
    if (currentWorkspace) {
      getPages.mutate(
        {
          id: currentWorkspace.id as string,
        },
        {
          onSuccess: (data) => {
            setPages([...data])
            if (initalCurrentPageData) {
              setCurrentPage(initalCurrentPageData)
            } else {
              setCurrentPage(data[0])
            }
          },
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWorkspace])

  const {
    handleToggleContextMenu,
    handleUpdateContextMenu,
    handleCloseContextMenu,
  } = useContextMenu()

  const [isSwitchSelected, setIsSwitchSelected] = useState(false)

  const [contextMenuSwitch, setContextMenuSwitch] = useState<string | null>(
    null
  )

  const workspaceContextMenuContent = (
    <div
      className={`flex fixed z-10 top-0 left-0 right-0 bg-image
    justify-end min-h-[6.875rem] pb-[2rem] max-w-[1024px]
    lg:rounded-[2.5rem] mx-auto lg:min-h-[2.5rem] lg:px-10 
    lg:py-10 text-white lg:mt-[1.5rem] mt-[19px] md:mt-0"`}
    >
      <div className="pr-4 z-10 flex space-x-3">
        <div className="flex flex-col items-end gap-2 md:gap-3">
          <div className="w-fit">
            <Tag
              variant="img"
              img_url={currentWorkspace?.avatar_url || ""}
              onClick={handleCloseContextMenu}
            />
          </div>
          <div className="w-fit">
            <Tag
              variant="icn-txt"
              text={text("creatorpage:switch")}
              icon={ArrowsLeftRight}
              isSelected={isSwitchSelected}
              onClick={() => handleSwitchClick()}
            />
          </div>
          <div className={`w-fit ${isSwitchSelected ? "hidden" : ""}`}>
            <Tag
              variant="icn-txt"
              text={text("creatorpage:settings")}
              icon={GearSix}
            />
          </div>
          <div className={`w-fit ${isSwitchSelected ? "hidden" : ""}`}>
            <Tag
              variant="icn-txt"
              text={text("creatorpage:profile")}
              icon={UserCircle}
              onClick={() => router.push(pageUrls.meSettings())}
            />
          </div>
          {isSwitchSelected && <>{loadWorkspaces()}</>}
        </div>
      </div>
    </div>
  )

  function loadPages() {
    if (pages) {
      const pagesTags: JSX.Element[] = pages.map((page, index) => {
        return (
          <div key={index} className="w-fit">
            <Tag
              variant="img-txt"
              text={page?.name || ""}
              img_url={page?.avatar_url || ""}
              isSelected={page.id == currentPage?.id}
              onClick={() => setCurrentPage(page as IPage)}
            />
          </div>
        )
      })
      return pagesTags
    }
  }

  const tabbarContextMenuContent = (
    <div className="fixed w-full px-[16px] flex flex-row justify-between left-0 right-0 bottom-[16px]">
      <div className="flex flex-col gap-3">
        <div className="w-fit">
          <Tag variant="txt" text={text("creatorpage:pages")} />
        </div>
        <>{loadPages()}</>
        <div className="w-fit">
          <Tag
            variant="icn-txt"
            text={text("creatorpage:newpage")}
            icon={Plus}
          />
        </div>
      </div>
      <div className="flex flex-col justify-end items-end gap-3">
        <div className="w-fit">
          <Tag
            variant="icn-txt"
            text={text("creatorpage:explore")}
            icon={MagnifyingGlass}
          />
        </div>
        <div className="w-fit">
          <Tag
            variant="icn"
            icon={ArrowsCounterClockwise}
            onClick={handleCloseContextMenu}
          />
        </div>
      </div>
    </div>
  )

  const lateralMenuContent = (
    <div>
      <div className="w-fit">
        <Tag
          variant="txt"
          text={text("creatorpage:explore")}
          onClick={() => router.push(pageUrls.home())}
        />
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <div className="w-fit">
          <Tag variant="txt" text={text("creatorpage:pages")} isSeparated />
        </div>
        <>{loadPages()}</>
        <div>
          <Tag
            variant="icn-txt"
            icon={Plus}
            text={text("creatorpage:newpage")}
            onClick={() => router.push(pageUrls.createPage())}
          />
        </div>
      </div>
    </div>
  )

  useEffect(() => {
    if (contextMenuSwitch === "workspace") {
      handleUpdateContextMenu(workspaceContextMenuContent)
    } else if (contextMenuSwitch === "tabbar") {
      handleUpdateContextMenu(tabbarContextMenuContent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSwitchSelected])

  function handleSwitchClick() {
    setIsSwitchSelected((prev) => !prev)
    handleUpdateContextMenu(workspaceContextMenuContent)
  }

  function loadWorkspaces() {
    if (workspaces) {
      const workspacesTags: JSX.Element[] = workspaces.map(
        (workspace, index) => {
          return (
            <div key={index} className="w-fit">
              <Tag
                variant="img-txt"
                img_url={workspace.avatar_url || ""}
                text={workspace.name || ""}
                isSelected={workspace.id == currentWorkspace?.id}
                onClick={() => setCurrentWorkspace(workspace as IWorkspace)}
              />
            </div>
          )
        }
      )
      return workspacesTags
    }
  }

  const handleHeaderTagContextMenu = () => {
    setContextMenuSwitch("workspace")
    handleToggleContextMenu(workspaceContextMenuContent)
  }

  const handleTabBarContextMenu = () => {
    setContextMenuSwitch("tabbar")
    handleToggleContextMenu(tabbarContextMenuContent)
  }

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("creatorpage:general")}
        onClick={() =>
          router.push(
            pageUrls.pageSettings({
              pageSlug: currentPage?.url || "",
              pageSettings: "general",
            })
          )
        }
      />,
      <Tag
        key={2}
        variant="txt"
        text={text("creatorpage:new")}
        onClick={() =>
          router.push(pageUrls.createTemplate(currentPage?.url as string))
        }
      />,
      <div key={3} className="xl:hidden w-fit">
        <Tag
          variant="icn"
          icon={ArrowsCounterClockwise}
          onClick={() => handleTabBarContextMenu()}
        />
      </div>,
      <div key={4} className="hidden xl:block">
        {lateralMenuContent}
      </div>,
    ]
  }

  function handleMainTag() {
    return (
      <Tag
        variant="img-txt"
        text={currentPage?.name || ""}
        img_url={currentPage?.avatar_url || ""}
        onClick={() =>
          router.push(
            pageUrls.pageSettings({
              pageSlug: currentPage?.url || "",
              pageSettings: "general",
            })
          )
        }
      />
    )
  }

  function loadHeader() {
    return (
      <Header
        reightContent={
          <Tag
            variant="img"
            img_url={currentWorkspace?.avatar_url || ""}
            onClick={() => handleHeaderTagContextMenu()}
          />
        }
        background_url={currentPage?.background_url || ""}
      >
        {handleMainTag()}
      </Header>
    )
  }

  const getTemplates = useMutateTemplatesByPageId()

  const [templates, setTemplates] = useState<ITemplate[]>()

  useEffect(() => {
    if (currentPage) {
      getTemplates.mutate(
        {
          id: currentPage.id as string,
        },
        {
          onSuccess: (data) => {
            setTemplates(data)
          },
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CreatorPageContent templatesData={templates} pageData={currentPage} />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
