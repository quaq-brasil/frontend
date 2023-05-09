import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import { useContextMenu } from "hooks/ContextMenuHook"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { User, UserCircle, UserCirclePlus, UserPlus } from "phosphor-react"
import { useEffect, useState } from "react"
import { IPage } from "types/Page.type"
import { ITemplate } from "types/Template.type"
import { IUpdateUser } from "types/User.type"
import { pageUrls } from "utils/pagesUrl"
import { ConsumerPageContent } from "./ConsumerPageContent"

type ConsumerPageProps = {
  initialPageData: IPage | undefined
  initialTemplatesData: ITemplate[] | undefined
  isLoggedIn: boolean
  initialUserData: IUpdateUser
}

export function ConsumerPage({
  initialPageData,
  initialTemplatesData,
  isLoggedIn,
  initialUserData,
}: ConsumerPageProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [userData, setUserData] = useState<IUpdateUser>(initialUserData)
  const [pageData, setPageData] = useState<IPage | undefined>(initialPageData)
  const [templatesData, setTemplatesData] = useState<ITemplate[] | undefined>(
    initialTemplatesData
  )
  const [header, setHeader] = useState<JSX.Element>()

  const { handleToggleContextMenu, handleCloseContextMenu } = useContextMenu()

  const handleHeaderTagContextMenu = () => {
    const handleContent = () => {
      if (isLoggedIn) {
        return (
          <div
            className={`flex fixed z-10 top-0 left-0 right-0 bg-image justify-end min-h-[6.875rem] pb-[2rem] max-w-[1024px]
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
              <div className="flex flex-col items-end gap-3">
                <div className="w-fit">
                  <Tag
                    variant="img"
                    img_url={userData?.avatar_url}
                    onClick={handleCloseContextMenu}
                  />
                </div>
                <div className="w-fit">
                  <Tag
                    variant="icn-txt"
                    text={text("consumerpage:profile")}
                    icon={User}
                    onClick={() => {
                      handleCloseContextMenu()
                      router.push(pageUrls.meSettings())
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div
            className={`flex fixed z-10 top-0 left-0 right-0 bg-image justify-end min-h-[6.875rem] pb-[2rem] max-w-[1024px]
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
                    text={text("consumerpage:login")}
                    icon={UserCircle}
                    onClick={() => {
                      handleCloseContextMenu()
                      router.push(pageUrls.login())
                    }}
                  />
                </div>
                <div className="w-fit">
                  <Tag
                    variant="icn-txt"
                    text={text("consumerpage:signup")}
                    icon={UserPlus}
                    onClick={() => {
                      handleCloseContextMenu()
                      router.push(pageUrls.signup())
                    }}
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
    if (!isLoggedIn) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("consumerpage:explore")}
          onClick={() => router.push(pageUrls.home())}
        />,
        <Tag
          key={2}
          variant="txt"
          text={text("consumerpage:usequaq")}
          onClick={handleHeaderTagContextMenu}
        />,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("consumerpage:explore")}
          onClick={() => router.push(pageUrls.home())}
        />,
        <Tag
          key={2}
          variant="txt"
          text={text("consumerpage:creation")}
          onClick={() => router.push(pageUrls.adm())}
        />,
      ]
    }
  }

  function handleMainTag() {
    return (
      <Tag
        variant="img-txt"
        text={pageData?.title || ""}
        img_url={pageData?.avatar_url || ""}
      />
    )
  }

  function loadHeader() {
    if (isLoggedIn) {
      return (
        <Header
          rightContent={
            <Tag
              variant="img"
              img_url={userData.avatar_url}
              onClick={handleHeaderTagContextMenu}
            />
          }
          background_url={pageData?.background_url || ""}
        >
          {handleMainTag()}
        </Header>
      )
    } else {
      return (
        <Header
          rightContent={
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

  useEffect(() => {
    if (initialPageData) {
      setPageData(initialPageData)
    }
  }, [initialPageData])

  useEffect(() => {
    if (initialTemplatesData) {
      setTemplatesData(initialTemplatesData)
    }
  }, [initialTemplatesData])

  useEffect(() => {
    if (initialUserData) {
      setUserData(initialUserData)
    }
  }, [initialUserData])

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn)
    setHeader(loadHeader())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return (
    <div className="bg-slate-100 fixed inset-0">
      {header}
      <ConsumerPageContent templatesData={templatesData} pageData={pageData} />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
