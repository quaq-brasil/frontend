import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { Tag } from "../../../components/Tag/Tag"
import { IPage } from "../../../types/Page.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { CreateTemplateContent } from "./CreateTemplateContent"

type CreateTemplateProps = {
  page: IPage | undefined
}

export default function CreateTemplate({ page }: CreateTemplateProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [pageData, setPageData] = useState<IPage>()

  useEffect(() => {
    setPageData(page)
  }, [page])

  function loadHeader() {
    return (
      <Header background_url={page?.background_url || ""}>
        <Tag
          variant="img-txt"
          text={page?.title || ""}
          img_url={page?.avatar_url || ""}
          onClick={() =>
            router.push(pageUrls.pageSettings({ pageSlug: pageData?.slug }))
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
