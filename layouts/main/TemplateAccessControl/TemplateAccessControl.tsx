import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IPage, IUpdatePage } from "../../../types/Page.type"
import { ITemplate, IUpdateTemplate } from "../../../types/Template.type"
import { TemplateAccessControlContent } from "./TemplateAccessControlContent"

type TemplateAccessControlProps = {
  initialTemplateData: ITemplate | undefined
  initialPageData: IPage | undefined
}

export default function TemplateAccessControl({
  initialTemplateData,
  initialPageData,
}: TemplateAccessControlProps) {
  const text = useTranslation().t

  const [templateData, setTemplateData] = useState<IUpdateTemplate>()
  const [pageData, setPageData] = useState<IUpdatePage>()

  useEffect(() => {
    setPageData(initialPageData)
    setTemplateData(initialTemplateData)
  }, [initialPageData, initialTemplateData])

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("accesscontrol:back")}
        onClick={() => console.log("tab1")}
      />,
      <div key={2} className="xl:hidden w-fit h-fit">
        <Tag
          variant="txt"
          text={text("accesscontrol:confirm")}
          onClick={() => console.log("tab1")}
        />
      </div>,
    ]
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
      <TemplateAccessControlContent templateData={templateData} />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
