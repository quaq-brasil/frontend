import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IPage, IUpdatePage } from "../../../types/Page.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { PageTrackersContent } from "./PageTrackersContent"

type PageTrackersProps = {
  handleUpdateTrackers: (data: IUpdatePage) => void
  initialPageData?: IPage
}

export default function PageTrackers({
  handleUpdateTrackers,
  initialPageData,
}: PageTrackersProps) {
  const text = useTranslation().t

  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [pageData, setPageData] = useState<IUpdatePage>()

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  useEffect(() => {
    setPageData(initialPageData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPageData])

  function handleUpdatePageData(newData: IUpdatePage) {
    setPageData({
      ...pageData,
      trackers: newData.trackers || pageData?.trackers,
    })
    handleUpdateIsUpdating(true)
  }

  const [runUpdate, setRunUpdate] = useState(false)

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
          text={text("pagetrackers:back")}
          onClick={() =>
            router.push(
              pageUrls.pageSettings({
                pageSlug: pageData?.slug || "",
                pageSettings: "general",
              })
            )
          }
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("pagetrackers:update")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("pagetrackers:back")}
          onClick={() =>
            router.push(
              pageUrls.pageSettings({
                pageSlug: pageData?.slug || "",
                pageSettings: "general",
              })
            )
          }
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
        <Tag
          variant="txt"
          text={text("pagetrackers:general")}
          onClick={() =>
            router.push(
              pageUrls.pageSettings({
                pageSlug: pageData?.slug || "",
                pageSettings: "general",
              })
            )
          }
        />
        <Tag variant="txt" text={text("pagetrackers:trackers")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <PageTrackersContent
        pageData={pageData}
        handleUpdateTrackers={handleUpdateTrackers}
        isUpdating={isUpdating}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        runUpdate={runUpdate}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        handleUpdatePageData={handleUpdatePageData}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
