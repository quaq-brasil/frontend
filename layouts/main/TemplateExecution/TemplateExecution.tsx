import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import { useRouter } from "next/router"
import Script from "next/script"
import { useEffect, useState } from "react"
import { getTemplateBySlugAndPageSlugProps } from "types/Template.type"

import { useContextMenu } from "hooks/ContextMenuHook"
import useTranslation from "next-translate/useTranslation"
import { User, UserCircle, UserCirclePlus, UserPlus } from "phosphor-react"
import { IUpdateUser } from "types/User.type"
import { pageUrls } from "utils/pagesUrl"
import { TemplateExecutionContent } from "./TemplateExecutionContent"

type TemplateExecutionContent = {
  initialData: getTemplateBySlugAndPageSlugProps | undefined
  isLoggedIn: boolean
  initialUserData: IUpdateUser
}

export function TemplateExecution({
  initialData,
  isLoggedIn,
  initialUserData,
}: TemplateExecutionContent) {
  const text = useTranslation().t
  const router = useRouter()

  const [pageAndTemplateData, setPageAndTemplateData] =
    useState<getTemplateBySlugAndPageSlugProps>(initialData)

  const [userData, setUserData] = useState<IUpdateUser>(initialUserData)

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
    return [
      // <Tag
      //   key={1}
      //   variant="txt"
      //   text={text("profile:back")}
      //   onClick={() => router.back()}
      // />,
      <Tag
        key={2}
        variant="txt"
        text={pageAndTemplateData?.Page.title}
        onClick={() =>
          router.push(pageUrls.page(pageAndTemplateData?.Page.slug || ""))
        }
      />,
    ]
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
          background_url={pageAndTemplateData?.Page.background_url || ""}
        >
          <Tag
            variant="img-txt"
            text={pageAndTemplateData?.Page.title || ""}
            img_url={pageAndTemplateData?.Page.avatar_url || ""}
            onClick={() =>
              router.push(pageUrls.page(pageAndTemplateData?.Page.slug || ""))
            }
          />
          <Tag
            variant="img-txt"
            text={pageAndTemplateData?.title || ""}
            img_url={pageAndTemplateData?.shortcut_image || ""}
          />
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
          background_url={pageAndTemplateData?.Page.background_url || ""}
        >
          <Tag
            variant="img-txt"
            text={pageAndTemplateData?.Page.title || ""}
            img_url={pageAndTemplateData?.Page.avatar_url || ""}
            onClick={() =>
              router.push(pageUrls.page(pageAndTemplateData?.Page.slug || ""))
            }
          />
          <Tag
            variant="img-txt"
            text={pageAndTemplateData?.title || ""}
            img_url={pageAndTemplateData?.shortcut_image || ""}
          />
        </Header>
      )
    }
  }

  useEffect(() => {
    setPageAndTemplateData(initialData)
  }, [initialData])

  useEffect(() => {
    if (initialUserData) {
      setUserData(initialUserData)
    }
  }, [initialUserData])

  useEffect(() => {
    setHeader(loadHeader())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return (
    <div className="bg-slate-100 fixed inset-0">
      {pageAndTemplateData?.trackers?.google && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${pageAndTemplateData?.trackers?.google}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${pageAndTemplateData?.trackers?.google}');
        `}
          </Script>
        </>
      )}

      {header}
      <TemplateExecutionContent
        setTemplateData={setPageAndTemplateData}
        pageAndTemplateData={pageAndTemplateData}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
