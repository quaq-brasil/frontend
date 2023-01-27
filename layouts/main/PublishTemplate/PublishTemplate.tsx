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
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setPageTitle(pageData?.name || "")
    setPageAvatar(pageData?.avatar_url || "")
    setPageCover(pageData?.background_url || "")
  }, [pageData])

  function handleIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("publishtemplate:back")}
          onClick={() => console.log("tab1")}
        />,
        <div key={2} className={`w-fit h-fit xl:hidden`}>
          <Tag
            variant="txt"
            text={text("publishtemplate:publish")}
            onClick={() => handleIsUpdating(false)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("publishtemplate:back")}
          onClick={() => console.log("tab1")}
        />,
      ]
    }
  }

  function loadHeader() {
    return (
      <Header background_url={pageCover}>
        <Tag variant="img-txt" text={pageTitle} img_url={pageAvatar} />
        <Tag variant="txt" text={text("publish:titletag")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <PublishTemplateContent
        handleCreateTemplate={handleCreateTemplate}
        isUpdating={isUpdating}
        pageData={pageData}
        handleIsUpdating={handleIsUpdating}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
