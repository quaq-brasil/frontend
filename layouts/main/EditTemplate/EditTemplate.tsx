import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IPage } from "../../../types/Page.type"
import { ITemplate, IUpateTemplate } from "../../../types/Template.type"
import { EditTemplateContent } from "./EditTemplateContent"

type EditTemplateProps = {
  pageData: IPage
  templateData: ITemplate
  handleUpdateTemplate: (data: IUpateTemplate) => void
}

export default function EditTemplate({
  pageData,
  templateData,
  handleUpdateTemplate,
}: EditTemplateProps) {
  const text = useTranslation().t

  const [pageTitle, setPageTitle] = useState<string>("")
  const [pageAvatar, setPageAvatar] = useState<string>("")
  const [pageCover, setPageCover] = useState<string>("")
  const [templateTitle, setTemplateTitle] = useState<string>("")
  const [templateAvatar, setTemplateAvatar] = useState<string>("")
  const [isUpdating, setIsUpdating] = useState(false)

  function handleIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  useEffect(() => {
    setPageTitle(pageData?.name || "")
    setPageAvatar(pageData?.avatar_url || "")
    setPageCover(pageData?.background_url || "")
    setTemplateTitle(templateData?.name || "")
    setTemplateAvatar(templateData?.shortcut_image || "")
  }, [pageData, templateData])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("edittemplate:tab1")}
          onClick={() => console.log("tab1")}
        />,
        <div key={2} className={`w-fit h-fit xl:hidden`}>
          <Tag
            variant="txt"
            text={text("edittemplate:confirm")}
            onClick={() => handleIsUpdating(false)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("edittemplate:tab1")}
          onClick={() => console.log("tab1")}
        />,
      ]
    }
  }

  function loadHeader() {
    return (
      <Header background_url={pageCover}>
        <Tag variant="img-txt" text={pageTitle} img_url={pageAvatar} />
        <Tag variant="img-txt" text={templateTitle} img_url={templateAvatar} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <EditTemplateContent
        handleUpdateTemplate={handleUpdateTemplate}
        templateData={templateData}
        handleIsUpdating={handleIsUpdating}
        isUpdating={isUpdating}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
