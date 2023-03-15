import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IUpdatePage } from "types/Page.type"
import { pageUrls } from "utils/pagesUrl"
import { GeneralSettingsContent } from "./GeneralSettingsContent"

type GeneralSettingsProps = {
  initialPageData: IUpdatePage
  handleUpdatePage: (data: IUpdatePage) => void
}

export function GeneralSettings({
  initialPageData,
  handleUpdatePage,
}: GeneralSettingsProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [pageData, setPageData] = useState<IUpdatePage>(initialPageData)
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

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

  useEffect(() => {
    if (initialPageData) {
      setPageData(initialPageData)
    }
  }, [initialPageData])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("generalsettings:back")}
          onClick={() => {
            handleUpdateIsUpdating(false)
            handleUpdateRunUpdate(false)
            router.push(
              pageUrls.pageSettings({
                pageSlug:
                  pageData?.slug != initialPageData.slug
                    ? initialPageData.slug
                    : pageData?.slug,
              })
            )
          }}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("generalsettings:update")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("generalsettings:back")}
          onClick={() => {
            handleUpdateIsUpdating(false)
            handleUpdateRunUpdate(false)
            router.push(
              pageUrls.pageSettings({
                pageSlug:
                  pageData?.slug != initialPageData.slug
                    ? initialPageData.slug
                    : pageData?.slug,
              })
            )
          }}
        />,
      ]
    }
  }

  function loadHeader() {
    return (
      <Header background_url={pageData?.background_url || ""}>
        <Tag
          variant="img-txt"
          text={pageData?.title || ""}
          img_url={pageData?.avatar_url || ""}
          onClick={() =>
            router.push(
              pageUrls.pageSettings({ pageSlug: pageData?.slug || "" })
            )
          }
        />
        <Tag variant="txt" text={text("generalsettings:titletag")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <GeneralSettingsContent
        initialPageData={initialPageData}
        pageData={pageData}
        handleUpdatePageData={handleUpdatePageData}
        handleUpdatePage={handleUpdatePage}
        isUpdating={isUpdating}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        runUpdate={runUpdate}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
