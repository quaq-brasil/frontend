import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import { useContextMenu } from "hooks/ContextMenuHook"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import {
  ArrowsCounterClockwise,
  ArrowsLeftRight,
  Compass,
  FilePlus,
  List,
  MagnifyingGlass,
  Plus,
  User,
  X,
} from "phosphor-react"
import { useEffect, useState } from "react"
import { useMutatePagesByWorkspaceId } from "services/hooks/usePage/useMutatePagesByWorkspaceId"
import { useMutateTemplatesByPageId } from "services/hooks/useTemplate/useMutateTemplatesByPageId"
import { IUserPayload } from "types/Auth.types"
import { IPage } from "types/Page.type"
import { ITemplate } from "types/Template.type"
import { IWorkspace } from "types/Workspace.type"
import { loadData, saveData } from "utils/localStorage"
import { pageUrls } from "utils/pagesUrl"
import { CreatorPageContent } from "./CreatorPageContent"

type PageInfoProps = {
  title: string
  description: string
}

type CreatorPageProps = {
  initialWorkspacesData: IWorkspace[] | undefined
  initialCurrentPageData?: IPage
  payload: IUserPayload | undefined
  handleUpdatePageTitle?: (newInfo: PageInfoProps) => void
}

export function CreatorPage({
  initialWorkspacesData,
  initialCurrentPageData,
  payload,
  handleUpdatePageTitle,
}: CreatorPageProps) {
  const [pages, setPages] = useState<IPage[]>()
  const [currentPage, setCurrentPage] = useState<IPage>()
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>(
    initialWorkspacesData
  )
  const [currentWorkspace, setCurrentWorkspace] = useState<IWorkspace>()
  const [userData, setUserData] = useState<IUserPayload>(payload)
  const [templates, setTemplates] = useState<ITemplate[]>()
  const {
    handleToggleContextMenu,
    handleUpdateContextMenu,
    handleCloseContextMenu,
  } = useContextMenu()
  const [isSwitchSelected, setIsSwitchSelected] = useState(false)
  const [contextMenuSwitch, setContextMenuSwitch] = useState<string | null>(
    null
  )

  const text = useTranslation().t

  const router = useRouter()

  const getPages = useMutatePagesByWorkspaceId()

  const getTemplates = useMutateTemplatesByPageId()

  const workspaceContextMenuContent = (
    <div
      className={`flex fixed z-10 top-0 left-0 right-0 bg-image
    justify-end min-h-[6.875rem] pb-[2rem] max-w-[1024px]
    lg:rounded-[2.5rem] mx-auto lg:min-h-[2.5rem] lg:px-10 
    lg:py-10 text-white lg:mt-[1.5rem] mt-[19px] md:mt-0`}
      onClick={handleCloseContextMenu}
    >
      <div
        className="mr-4 z-10 flex space-x-3"
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <div className="flex flex-col items-end gap-2 md:gap-3">
          <div className="w-fit">
            <Tag
              variant="img"
              img_url={userData?.avatar_url || ""}
              onClick={handleCloseContextMenu}
            />
          </div>
          <div className={`w-fit`}>
            <Tag
              variant="icn-txt"
              text={text("creatorpage:profile")}
              icon={User}
              onClick={() => {
                handleCloseContextMenu()
                router.push(pageUrls.meSettings())
              }}
            />
          </div>
          <div className="flex flex-row justify-center gap-2 lg:gap-3">
            <div className="w-fit">
              <Tag
                variant="icn"
                icon={isSwitchSelected ? X : ArrowsLeftRight}
                onClick={() => handleSwitchClick()}
              />
            </div>
            <div className="w-fit">
              <Tag
                variant="img-txt"
                text={currentWorkspace?.title}
                img_url={currentWorkspace?.avatar_url || ""}
                isSelected={isSwitchSelected}
                onClick={() => {
                  handleCloseContextMenu()
                  router.push(
                    pageUrls.workspaceSettings({
                      workspaceSlug: currentWorkspace?.slug,
                    })
                  )
                }}
              />
            </div>
          </div>
          {isSwitchSelected && <>{loadWorkspaces()}</>}
          {isSwitchSelected && (
            <Tag
              variant="icn-txt"
              text={text("creatorpage:newworkspace")}
              icon={Plus}
              onClick={() => {
                handleCloseContextMenu()
                router.push(
                  pageUrls.workspaceSettings({ settings: "new-workspace" })
                )
              }}
            />
          )}
        </div>
      </div>
    </div>
  )

  const tabbarContextMenuContent = (
    <div className="fixed w-full px-[16px] flex flex-row justify-between left-0 right-0 bottom-[16px]">
      <div className="flex flex-col gap-2 lg:gap-3">
        <div className="w-fit">
          <Tag variant="txt" text={text("creatorpage:pages")} />
        </div>
        <div className="flex flex-col gap-2">{loadPages()}</div>
        <div className="w-fit">
          <Tag
            variant="icn-txt"
            text={text("creatorpage:newpage")}
            icon={Plus}
            onClick={() => {
              handleCloseContextMenu()
              router.push(
                pageUrls.workspaceSettings({
                  workspaceSlug: currentWorkspace?.slug,
                  settings: "new-page",
                })
              )
            }}
          />
        </div>
      </div>
      <div className="flex flex-col justify-end items-end gap-2 lg:gap-3">
        <div className="w-fit">
          <Tag
            variant="icn-txt"
            text={text("creatorpage:explore")}
            icon={MagnifyingGlass}
            onClick={() => {
              handleCloseContextMenu()
              router.push(pageUrls.home())
            }}
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
    <div className="min-h-[100] flex flex-col">
      <div className="w-fit">
        <Tag
          variant="txt"
          text={text("creatorpage:explore")}
          onClick={() => router.push(pageUrls.home())}
        />
      </div>
      <div className="flex flex-col gap-3 mt-3 min-h-[100%]">
        <div className="w-fit">
          <Tag variant="txt" text={text("creatorpage:pages")} isSeparated />
        </div>
        <div className="min-h-[100] flex flex-col">
          <div className="flex flex-col gap-3">{loadPages()}</div>
        </div>
        <div>
          <Tag
            variant="icn-txt"
            icon={Plus}
            text={text("creatorpage:newpage")}
            onClick={() =>
              router.push(
                pageUrls.workspaceSettings({
                  workspaceSlug: currentWorkspace?.slug,
                  settings: "new-page",
                })
              )
            }
          />
        </div>
      </div>
    </div>
  )

  function handleCurrentWorkspaceUpdate(newWorkspace: IWorkspace) {
    setCurrentWorkspace(newWorkspace)
    saveData("currentWorkspaceId", newWorkspace.id)
    getPages.mutate(
      { id: newWorkspace.id },
      {
        onSuccess: (data) => {
          setPages(data)
          setCurrentPage(data[0])
        },
      }
    )
  }

  function handleCurrentPageUpdate(newPage: IPage) {
    setCurrentPage(newPage)
    saveData("currentPageId", newPage.id)
    router.push(pageUrls.pageSettings({ pageSlug: newPage.slug }))
  }

  function loadWorkspaces() {
    if (workspaces) {
      const workspacesTags: JSX.Element[] = workspaces.map((workspace) => {
        if (currentWorkspace.id != workspace.id) {
          return (
            <div key={workspace.id} className="w-fit">
              <Tag
                variant="img-txt"
                img_url={workspace.avatar_url || ""}
                text={workspace.title || ""}
                isSelected={workspace.id == currentWorkspace?.id}
                onClick={() => {
                  handleCloseContextMenu()
                  handleCurrentWorkspaceUpdate(workspace)
                }}
              />
            </div>
          )
        }
      })
      return workspacesTags
    }
  }

  function loadPages() {
    if (pages) {
      const pagesTags: JSX.Element[] = pages.map((page) => {
        return (
          <div key={page.id} className="w-fit">
            <Tag
              variant="img-txt"
              text={page?.title || ""}
              img_url={page?.avatar_url || ""}
              isSelected={page.id == currentPage?.id}
              onClick={() => {
                handleCloseContextMenu()
                handleCurrentPageUpdate(page)
              }}
            />
          </div>
        )
      })
      return pagesTags
    }
  }

  function handleSwitchClick() {
    setIsSwitchSelected((prev) => !prev)
    handleUpdateContextMenu(workspaceContextMenuContent)
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
        variant="icn-txt"
        text={text("creatorpage:general")}
        icon={List}
        onClick={() => {
          handleCloseContextMenu()
          router.push(
            pageUrls.pageSettings({
              pageSlug: currentPage?.slug || "",
              pageSettings: "general",
            })
          )
        }}
      />,
      <Tag
        key={2}
        variant="icn-txt"
        text={text("creatorpage:new")}
        icon={Plus}
        onClick={() => {
          handleCloseContextMenu()
          router.push(pageUrls.createTemplate(currentPage?.slug))
        }}
      />,
      <div key={3} className="xl:hidden w-fit">
        <Tag
          variant="icn"
          icon={ArrowsCounterClockwise}
          onClick={() => handleTabBarContextMenu()}
        />
      </div>,
      <div key={4} className="hidden xl:block min-h-[100%]">
        {lateralMenuContent}
      </div>,
    ]
  }

  function loadTabBar() {
    return (
      <div
        className="hidden xl:block pt-[34px] pl-[34px] justify-center h-full bg-gradient-to-r from-slate-200 top-0 
        fixed z-30 left-0"
      >
        <div className=" flex flex-col gap-3 top-0 h-screen">
          <div className="w-fit">
            <Tag
              key={1}
              variant="icn-txt"
              text={text("creatorpage:general")}
              icon={List}
              onClick={() =>
                router.push(
                  pageUrls.pageSettings({
                    pageSlug: currentPage?.slug || "",
                    pageSettings: "general",
                  })
                )
              }
            />
          </div>
          <div className="w-fit">
            <Tag
              key={2}
              variant="icn-txt"
              text={text("creatorpage:new")}
              icon={Plus}
              onClick={() =>
                router.push(pageUrls.createTemplate(currentPage?.slug))
              }
            />
          </div>
          <div key={3} className="xl:hidden w-fit">
            <Tag
              variant="icn"
              icon={ArrowsCounterClockwise}
              onClick={() => handleTabBarContextMenu()}
            />
          </div>
          <div className="w-fit">
            <Tag
              variant="icn-txt"
              text={text("creatorpage:explore")}
              icon={Compass}
              onClick={() => router.push(pageUrls.home())}
            />
          </div>
          <div className="w-fit mt-3">
            <Tag variant="txt" text={text("creatorpage:pages")} isSeparated />
          </div>
          <div className="overflow-y-auto scrollbar-hide max-h-fit">
            <div className="flex flex-col gap-3">{loadPages()}</div>
          </div>
          <div className="mb-[68px]">
            <Tag
              variant="icn-txt"
              icon={FilePlus}
              text={text("creatorpage:newpage")}
              onClick={() =>
                router.push(
                  pageUrls.workspaceSettings({
                    workspaceSlug: currentWorkspace?.slug,
                    settings: "new-page",
                  })
                )
              }
            />
          </div>
        </div>
      </div>
    )
  }

  function handleMainTag() {
    return (
      <Tag
        variant="img-txt"
        text={currentPage?.title || ""}
        img_url={currentPage?.avatar_url || ""}
        onClick={() =>
          router.push(
            pageUrls.pageSettings({
              pageSlug: currentPage?.slug || "",
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
        rightContent={
          <Tag
            variant="img"
            img_url={userData?.avatar_url}
            onClick={() => handleHeaderTagContextMenu()}
          />
        }
        background_url={currentPage?.background_url || ""}
      >
        {handleMainTag()}
      </Header>
    )
  }

  function handleUpdateTemplates(newTemplates: ITemplate[]) {
    setTemplates([...newTemplates])
  }

  useEffect(() => {
    if (initialWorkspacesData) {
      setWorkspaces([...initialWorkspacesData])
      const currentWorkspaceId = loadData("currentWorkspaceId")
      if (currentWorkspaceId) {
        const newCurrentWorkspace = initialWorkspacesData.filter(
          (workspace) => {
            if (workspace.id === currentWorkspaceId) {
              return workspace
            }
          }
        )
        if (newCurrentWorkspace[0]) {
          setCurrentWorkspace(newCurrentWorkspace[0])
          getPages.mutate(
            { id: newCurrentWorkspace[0].id },
            {
              onSuccess: (data) => {
                setPages(data)
                const currentPageId = loadData("currentPageId")
                if (currentPageId) {
                  const newCurrentPage = data.filter((page) => {
                    if (page.id === currentPageId) {
                      return page
                    }
                  })
                  if (newCurrentPage[0]) {
                    setCurrentPage(newCurrentPage[0])
                  }
                } else {
                  setCurrentPage(data[0])
                }
              },
            }
          )
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialWorkspacesData])

  useEffect(() => {
    if (payload) {
      setUserData(payload)
    }
  }, [payload])

  useEffect(() => {
    if (currentPage) {
      getTemplates.mutate(
        {
          id: currentPage.id,
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

  useEffect(() => {
    if (currentPage) {
      let pageTitle =
        currentPage.title.charAt(0).toUpperCase() +
        currentPage.title.slice(1).toLowerCase()
      handleUpdatePageTitle &&
        handleUpdatePageTitle({
          title: pageTitle,
          description: currentPage.description,
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  useEffect(() => {
    if (contextMenuSwitch === "workspace") {
      handleUpdateContextMenu(workspaceContextMenuContent)
    } else if (contextMenuSwitch === "tabbar") {
      handleUpdateContextMenu(tabbarContextMenuContent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSwitchSelected])

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CreatorPageContent
        templatesData={templates}
        pageData={currentPage}
        handleUpdateTemplates={handleUpdateTemplates}
      />
      <TabBar isHidden={true} tags={handleTabBar()} />
      {loadTabBar()}
    </div>
  )
}
