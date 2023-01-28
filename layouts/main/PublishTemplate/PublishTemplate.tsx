import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IPage } from "../../../types/Page.type"
import { ITemplate } from "../../../types/Template.type"
import { PublishTemplateContent } from "./PublishTemplateContent"

type PublishTemplateProps = {
  pageData: IPage
  handleCreateTemplate: (pageData: ITemplate) => void
}

export default function PublishTemplate({
  pageData,
  handleCreateTemplate,
}: PublishTemplateProps) {
  const text = useTranslation().t

  const [pageTitle, setPageTitle] = useState<string>("")
  const [pageAvatar, setPageAvatar] = useState<string>("")
  const [pageCover, setPageCover] = useState<string>("")
  const [pageId, setPageId] = useState<string>("")
  const [templateTitle, setTemplateTitle] = useState<string>("")
  const [templateLink, setTemplateLink] = useState<string>("")
  const [templateCover, setTemplateCover] = useState<string>("")
  const [templateSize, setTemplateSize] = useState<string>("")
  const [publicationTitle, setPublicationTitle] = useState<string>("")
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setPageTitle(pageData?.name || "")
    setPageAvatar(pageData?.avatar_url || "")
    setPageCover(pageData?.background_url || "")
    setPageId(pageData?.id || "")
    console.log(pageData?.id)
  }, [pageData])

  function handleIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateTemplateTitle(title: string) {
    setTemplateTitle(title)
    handleIsUpdating(true)
  }

  function handleUpdateTemplateLink(link: string) {
    setTemplateLink(link)
    handleIsUpdating(true)
  }

  function handleUpdateTemplateCover(cover: string) {
    setTemplateCover(cover)
    handleIsUpdating(true)
  }

  function handleUpdateTemplateSize(size: string) {
    setTemplateSize(size)
    handleIsUpdating(true)
  }

  function handleUpdatePublicationTitle(title: string) {
    setPublicationTitle(title)
  }

  function handleCreate() {
    const newData: ITemplate = {
      current_publication_id: "63ae050ffbbce66bbc152486",
      name: templateTitle,
      number_of_new_interactions: 0,
      page_id: pageId,
      shortcut_image: templateCover,
      shortcut_size: templateSize,
      url: templateLink,
      facebook_pixel_id: "1",
    }
    handleCreateTemplate(newData)
    handleIsUpdating(false)
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("publish:back")}
          onClick={() => console.log("tab1")}
        />,
        <div key={2} className={`w-fit h-fit xl:hidden`}>
          <Tag
            variant="txt"
            text={text("publish:publish")}
            onClick={handleCreate}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("publish:back")}
          onClick={() => console.log("tab1")}
        />,
      ]
    }
  }

  function loadHeader() {
    return (
      <Header background_url={pageCover}>
        <Tag variant="img-txt" text={pageTitle} img_url={pageAvatar} />
        {templateTitle == "" && templateCover == "" && (
          <Tag variant="txt" text={text("publish:titletag")} />
        )}
        {templateTitle != "" && templateCover == "" && (
          <Tag variant="txt" text={templateTitle} />
        )}
        {templateTitle != "" && templateCover != "" && (
          <Tag variant="img-txt" text={templateTitle} img_url={templateCover} />
        )}
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <PublishTemplateContent
        handleCreate={handleCreate}
        isUpdating={isUpdating}
        handleUpdateTemplateTitle={handleUpdateTemplateTitle}
        handleUpdateTemplateLink={handleUpdateTemplateLink}
        handleUpdateTemplateCover={handleUpdateTemplateCover}
        handleUpdateTemplateSize={handleUpdateTemplateSize}
        handleUpdatePublicationTitle={handleUpdatePublicationTitle}
        size={templateSize}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
