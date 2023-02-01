import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import {
  ArrowCounterClockwise,
  UserCircle,
  UserCirclePlus,
  UserPlus,
} from "phosphor-react"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { useContextMenu } from "../../../hooks/ContextMenuHook"
import { IPage } from "../../../types/Page.type"
import { ITemplate } from "../../../types/Template.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { ExplorerContent } from "./ExplorerContent"

type ExplorerProps = {
  initialPageData: IPage
  initialTemplatesData: ITemplate[]
}

export default function Explorer({
  initialPageData,
  initialTemplatesData,
}: ExplorerProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [pageData, setPageData] = useState<IPage>()
  const [templatesData, setTemplatesData] = useState<ITemplate[]>()

  useEffect(() => {
    setPageData(initialPageData)
  }, [initialPageData])

  useEffect(() => {
    setTemplatesData(initialTemplatesData)
  }, [initialTemplatesData])

  const { handleToggleContextMenu, handleCloseContextMenu } = useContextMenu()

  const isSignedIn = false

  function handleRedirectToLogin() {
    handleCloseContextMenu()
    router.push(pageUrls.login())
  }

  const handleHeaderTagContextMenu = () => {
    const handleContent = () => {
      if (!isSignedIn) {
        return (
          <div
            className={`flex fixed z-10 top-0 left-0 right-0 bg-image
      justify-end min-h-[6.875rem] pb-[2rem] max-w-[1024px]
      lg:rounded-[2.5rem] mx-auto lg:min-h-[2.5rem] lg:px-10 
      lg:py-10 text-white lg:mt-[1.5rem] mt-[19px] md:mt-0"`}
          >
            <div className="pr-4 z-10 flex space-x-3">
              <div className="flex flex-col items-end gap-3">
                <div className="w-fit">
                  <Tag
                    variant="icn"
                    icon={UserCirclePlus}
                    onClick={handleCloseContextMenu}
                  />
                </div>
                <div className="w-fit">
                  <Tag
                    variant="icn-txt"
                    text={text("explorer:login")}
                    icon={UserCircle}
                    onClick={handleRedirectToLogin}
                  />
                </div>
                <div className="w-fit">
                  <Tag
                    variant="icn-txt"
                    text={text("explorer:signup")}
                    icon={UserPlus}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

    handleToggleContextMenu(handleContent())
  }

  function handleTabBar() {
    if (isSignedIn) {
      return [
        <Tag
          key={1}
          variant="icn-txt"
          text={text("explorer:pages")}
          icon={ArrowCounterClockwise}
          onClick={() => console.log("explore")}
        />,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("explorer:usequaq")}
          onClick={handleHeaderTagContextMenu}
        />,
      ]
    }
  }

  function handleMainTag() {
    return (
      <Tag
        variant="img-txt"
        text={pageData?.name || ""}
        img_url={pageData?.avatar_url || ""}
      />
    )
  }

  function loadHeader() {
    if (isSignedIn) {
      return (
        <Header background_url={pageData?.background_url || ""}>
          {handleMainTag()}
        </Header>
      )
    } else {
      return (
        <Header
          reightContent={
            <Tag
              variant="icn"
              icon={UserCirclePlus}
              onClick={handleHeaderTagContextMenu}
            />
          }
          background_url={pageData?.background_url || ""}
        >
          {handleMainTag()}
        </Header>
      )
    }
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <ExplorerContent templatesData={templatesData} />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
