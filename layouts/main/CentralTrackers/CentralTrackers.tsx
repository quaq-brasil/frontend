import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IPage, IUpdatePage } from "types/Page.type"
import { ITemplate, IUpdateTemplate } from "types/Template.type"
import { pageUrls } from "utils/pagesUrl"
import { CentralTrackersContent } from "./CentralTrackersContent"

type CentralTrackersProps = {
  handleUpdateTrackers: (data: IUpdateTemplate) => void
  initialPageData: IPage
  initialTemplateData: ITemplate
}

export default function CentralTrackers({
  handleUpdateTrackers,
  initialPageData,
  initialTemplateData,
}: CentralTrackersProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [pageData, setPageData] = useState<IUpdatePage>(initialPageData)
  const [templateData, setTemplateData] =
    useState<IUpdateTemplate>(initialTemplateData)

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateTemplateData(newData: IUpdateTemplate) {
    setTemplateData((state) => {
      return {
        ...state,
        ...newData,
      } as IUpdateTemplate
    })
    handleUpdateIsUpdating(true)
  }

  useEffect(() => {
    if (initialPageData) {
      setPageData(initialPageData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPageData])

  useEffect(() => {
    if (initialTemplateData) {
      setTemplateData(initialTemplateData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTemplateData])

  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("centraltrackers:back")}
          onClick={() =>
            router.push(
              pageUrls.templateCentral({
                pageSlug: pageData?.slug,
                templateSlug: templateData?.slug,
                settings: "central",
              })
            )
          }
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("centraltrackers:update")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("centraltrackers:back")}
          onClick={() =>
            router.push(
              pageUrls.templateCentral({
                pageSlug: pageData?.slug,
                templateSlug: templateData?.slug,
                settings: "central",
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
          onClick={() => router.push(pageUrls.pageSettings({}))}
        />
        <Tag
          variant="img-txt"
          text={templateData?.title || ""}
          img_url={templateData?.shortcut_image || ""}
          onClick={() =>
            router.push(
              pageUrls.templateCentral({
                pageSlug: pageData?.slug,
                templateSlug: templateData?.slug,
                settings: "central",
              })
            )
          }
        />
        <Tag variant="txt" text={text("centraltrackers:trackers")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CentralTrackersContent
        handleUpdateTrackers={handleUpdateTrackers}
        isUpdating={isUpdating}
        templateData={templateData}
        runUpdate={runUpdate}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        handleUpdateTemplateData={handleUpdateTemplateData}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
