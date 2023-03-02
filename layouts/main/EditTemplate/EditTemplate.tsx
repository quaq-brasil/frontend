import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IPage, IUpdatePage } from "../../../types/Page.type"
import { ITemplate, IUpdateTemplate } from "../../../types/Template.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { EditTemplateContent } from "./EditTemplateContent"

type EditTemplateProps = {
  initialPageData: IPage
  initialTemplateData: ITemplate
  handleUpdateTemplate: (data: IUpdateTemplate) => void
}

export default function EditTemplate({
  initialPageData,
  initialTemplateData,
  handleUpdateTemplate,
}: EditTemplateProps) {
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
    setPageData(initialPageData)
    setTemplateData(initialTemplateData)
  }, [initialPageData, initialTemplateData])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("edittemplate:back")}
          onClick={() =>
            router.push(pageUrls.pageSettings({ pageSlug: pageData.slug }))
          }
        />,
        <div key={2} className={`w-fit h-fit xl:hidden`}>
          <Tag
            variant="txt"
            text={text("edittemplate:update")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("edittemplate:back")}
          onClick={() =>
            router.push(pageUrls.pageSettings({ pageSlug: pageData.slug }))
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
      <EditTemplateContent
        pageData={pageData}
        templateData={templateData}
        handleUpdateTemplateData={handleUpdateTemplateData}
        handleUpdateTemplate={handleUpdateTemplate}
        isUpdating={isUpdating}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        runUpdate={runUpdate}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
