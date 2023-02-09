import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IPage } from "../../../types/Page.type"
import { getTemplateByUrlAndPageUrlProps } from "../../../types/Template.type"
import { EditPublicationContent } from "./EditPublicationContent"

type EditPublicationProps = {
  page: IPage | undefined
  template: getTemplateByUrlAndPageUrlProps | undefined
}

export function EditPublication({ page, template }: EditPublicationProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [pageData, setPageData] = useState(page)
  const [templateData, setTemplateData] = useState(template)

  useEffect(() => {
    setPageData(page)
    setTemplateData(template)
  }, [page, template])

  return (
    <div className="bg-slate-100 fixed inset-0">
      <EditPublicationContent pageData={pageData} templateData={templateData} />
    </div>
  )
}
