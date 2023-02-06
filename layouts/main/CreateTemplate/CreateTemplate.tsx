import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { Tag } from "../../../components/Tag/Tag"
import { IPage } from "../../../types/Page.type"
import { CreateTemplateContent } from "./CreateTemplateContent"

type CreateTemplateProps = {
  page: IPage | undefined
}

export default function CreateTemplate({ page }: CreateTemplateProps) {
  const text = useTranslation().t

  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)
  const [pageData, setPageData] = useState<IPage>()

  useEffect(() => {
    setPageData(page)
  }, [page])

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function loadHeader() {
    return (
      <Header
        background_url={
          page?.background_url ||
          "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag
          variant="img-txt"
          text={page?.name || ""}
          img_url={page?.avatar_url || "https://source.unsplash.com/featured/"}
        />
        <Tag variant="txt" text={text("createtemplate:newtemplate")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CreateTemplateContent
        isUpdating={isUpdating}
        runUpdating={runUpdate}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        pageData={pageData}
      />
    </div>
  )
}
