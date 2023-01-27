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

  const [isUpdating, setIsUpdating] = useState(false)

  function handleIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  const [pageTitle, setPageTitle] = useState<string>("")
  const [pageAvatar, setPageAvatar] = useState<string>("")
  const [pageCover, setPageCover] = useState<string>("")
  const [templateTitle, setTemplateTitle] = useState<string>("")
  const [templateAvatar, setTemplateAvatar] = useState<string>("")

  function handleUpdatePageTitle(title: string) {
    setPageTitle(title)
  }

  function handleUpdatePageAvatar(avatar: string) {
    setPageAvatar(avatar)
  }

  function handleUpdatePageCover(cover: string) {
    setPageCover(cover)
  }

  function handleUpdateTemplateTitle(title: string) {
    setTemplateTitle(title)
  }

  function handleUpdateTemplateAvatar(avatar: string) {
    setTemplateAvatar(avatar)
  }

  useEffect(() => {
    handleUpdatePageTitle(pageData?.name || "")
    handleUpdatePageAvatar(pageData?.avatar_url || "")
    handleUpdatePageCover(pageData?.background_url || "")
    handleUpdateTemplateTitle(templateData?.name || "")
    handleUpdateTemplateAvatar(templateData?.shortcut_image || "")
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
            onClick={() => console.log("tab1")}
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
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
