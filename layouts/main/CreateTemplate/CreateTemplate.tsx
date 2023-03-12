import { Header } from "components/Header/Header"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IPage } from "types/Page.type"
import { pageUrls } from "utils/pagesUrl"
import { CreateTemplateContent } from "./CreateTemplateContent"

type CreateTemplateProps = {
  initialPageData: IPage | undefined
}

export default function CreateTemplate({
  initialPageData,
}: CreateTemplateProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [pageData, setPageData] = useState<IPage>(initialPageData)

  useEffect(() => {
    setPageData(initialPageData)
  }, [initialPageData])

  function loadHeader() {
    return (
      <Header background_url={pageData.background_url || ""}>
        <Tag
          variant="img-txt"
          text={pageData.title || ""}
          img_url={pageData.avatar_url || ""}
          onClick={() =>
            router.push(pageUrls.pageSettings({ pageSlug: pageData.slug }))
          }
        />
        <Tag variant="txt" text={text("createtemplate:newtemplate")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CreateTemplateContent pageData={pageData} />
    </div>
  )
}
