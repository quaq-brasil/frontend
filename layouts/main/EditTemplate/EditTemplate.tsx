import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IPage, IUpdatePage } from "../../../types/Page.type"
import { ITemplate, IUpateTemplate } from "../../../types/Template.type"
import { EditTemplateContent } from "./EditTemplateContent"

type EditTemplateProps = {
  initialPageData: IPage
  initialTemplateData: ITemplate
  handleUpdateTemplate: (data: IUpateTemplate) => void
}

export default function EditTemplate({
  initialPageData,
  initialTemplateData,
  handleUpdateTemplate,
}: EditTemplateProps) {
  const text = useTranslation().t

  const [pageData, setPageData] = useState<IUpdatePage>()
  const [templateData, setTemplateData] = useState<IUpateTemplate>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleUpdateTemplateData(newData: IUpateTemplate) {
    setTemplateData({
      ...templateData,
      name: newData.name || templateData?.name,
      shortcut_image: newData.shortcut_image || templateData?.shortcut_image,
      shortcut_size: newData.shortcut_size || templateData?.shortcut_size,
      current_publication_id:
        newData.current_publication_id || templateData?.current_publication_id,
      url: newData.url || templateData?.url,
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
          onClick={() => console.log("tab1")}
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
          onClick={() => console.log("tab1")}
        />,
      ]
    }
  }

  function loadHeader() {
    return (
      <Header background_url={pageData?.background_url || ""}>
        <Tag
          variant="img-txt"
          text={pageData?.name || ""}
          img_url={pageData?.avatar_url || ""}
        />
        <Tag
          variant="img-txt"
          text={templateData?.name || ""}
          img_url={templateData?.shortcut_image || ""}
        />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <EditTemplateContent
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
