import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IUpdatePage } from "types/Page.type"
import { IUpdateTemplate } from "types/Template.type"
import { pageUrls } from "utils/pagesUrl"
import { CentralOptionsContent } from "./CentralOptionsContent"

type CentralOptionsProps = {
  initialPageData: IUpdatePage | undefined
  initialTemplateData: IUpdateTemplate | undefined
  handleUpdateTemplate: (data: IUpdateTemplate) => void
}

export function CentralOptions({
  initialPageData,
  initialTemplateData,
  handleUpdateTemplate,
}: CentralOptionsProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [pageData, setPageData] = useState<IUpdatePage>(initialPageData)
  const [templateData, setTemplateData] =
    useState<IUpdateTemplate>(initialTemplateData)
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  useEffect(() => {
    setPageData(initialPageData)
  }, [initialPageData])

  useEffect(() => {
    setTemplateData(initialTemplateData)
  }, [initialTemplateData])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("centraloptions:back")}
          onClick={() => {
            handleUpdateIsUpdating(false)
            handleUpdateRunUpdate(false)
            router.push(
              pageUrls.pageSettings({
                pageSlug: pageData?.slug || pageUrls.home(),
              })
            )
          }}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("centraloptions:update")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("centraloptions:back")}
          onClick={() => {
            handleUpdateIsUpdating(false)
            handleUpdateRunUpdate(false)
            router.push(
              pageUrls.pageSettings({
                pageSlug: pageData?.slug || pageUrls.home(),
              })
            )
          }}
        />,
        <Tag
          key={2}
          variant="txt"
          text={text("centraloptions:options")}
          onClick={() =>
            router.push(
              pageUrls.templateCentral({
                pageSlug: pageData?.slug,
                settings: "central",
                templateSlug:
                  templateData?.slug != initialTemplateData.slug
                    ? initialTemplateData.slug
                    : templateData?.slug,
              })
            )
          }
          isSelected
          isSeparated
        />,
        <Tag
          key={3}
          variant="txt"
          text={text("centraloptions:logs")}
          onClick={() =>
            router.push(
              pageUrls.templateCentral({
                pageSlug: pageData?.slug,
                settings: "logs",
                templateSlug:
                  templateData?.slug != initialTemplateData.slug
                    ? initialTemplateData.slug
                    : templateData?.slug,
              })
            )
          }
        />,
        <Tag
          key={4}
          variant="txt"
          text={text("centraloptions:stats")}
          onClick={() =>
            router.push(
              pageUrls.templateCentral({
                pageSlug: pageData?.slug,
                settings: "stats",
                templateSlug:
                  templateData?.slug != initialTemplateData.slug
                    ? initialTemplateData.slug
                    : templateData?.slug,
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
              pageUrls.pageSettings({
                pageSlug: pageData?.slug || pageUrls.home(),
              })
            )
          }
        />
        <Tag
          variant="img-txt"
          text={templateData?.title || ""}
          img_url={templateData?.shortcut_image || ""}
        />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CentralOptionsContent
        templateData={templateData}
        initialTemplateData={initialTemplateData}
        isUpdating={isUpdating}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        pageData={pageData}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        runUpdate={runUpdate}
        handleUpdateTemplate={handleUpdateTemplate}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
