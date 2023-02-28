import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IPage } from "../../../types/Page.type"
import {
  getTemplateBySlugAndPageSlugProps,
  ITemplate,
} from "../../../types/Template.type"

import { pageUrls } from "../../../utils/pagesUrl"
import { TemplateExecutionContent } from "./TemplateExecutionContent"

type TemplateExecutionContent = {
  initialData: getTemplateBySlugAndPageSlugProps | undefined
}

export default function TemplateExecution({
  initialData,
}: TemplateExecutionContent) {
  const text = useTranslation().t

  const [pageData, setPageData] = useState<IPage>(initialData.Page)
  const [templateData, setTemplateData] = useState<ITemplate>(initialData)

  useEffect(() => {
    setPageData(initialData.Page)
  }, [initialData])

  useEffect(() => {
    setTemplateData(initialData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData])

  const router = useRouter()

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("profile:back")}
        onClick={() => router.back()}
      />,
      <Tag
        key={2}
        variant="txt"
        text={pageData?.title as string}
        onClick={() => router.push(pageUrls.page(pageData?.slug || ""))}
      />,
    ]
  }

  function loadHeader() {
    return (
      <Header background_url={pageData?.background_url || ""}>
        <Tag
          variant="img-txt"
          text={pageData?.title || ""}
          img_url={pageData?.avatar_url || ""}
          onClick={() => router.push(pageUrls.page(pageData?.slug || ""))}
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
      <TemplateExecutionContent
        initialData={templateData}
        setTemplateData={setTemplateData}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
