import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IPage } from "../../../types/Page.type"
import { ITemplate } from "../../../types/Template.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { TemplateExecutionContent } from "./TemplateExecutionContent"

type TemplateExecutionContent = {
  initialPageData: IPage | undefined
  initialTemplateData: ITemplate | undefined
}

export default function TemplateExecution({
  initialPageData,
  initialTemplateData,
}: TemplateExecutionContent) {
  const text = useTranslation().t

  const [pageData, setPageData] = useState<IPage>()
  const [templateData, setTemplateData] = useState<ITemplate>()

  useEffect(() => {
    setPageData(initialPageData)
  }, [initialPageData])

  useEffect(() => {
    setTemplateData(initialTemplateData)
  }, [initialTemplateData])

  const router = useRouter()

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("profile:back")}
        onClick={() => router.push(pageUrls.page(pageData?.url || ""))}
      />,
    ]
  }

  function loadHeader() {
    return (
      <Header background_url={pageData?.background_url || ""}>
        <Tag
          variant="img-txt"
          text={pageData?.name || ""}
          img_url={pageData?.avatar_url || ""}
          onClick={() => router.push(pageUrls.page(pageData?.url || ""))}
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
      <TemplateExecutionContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
