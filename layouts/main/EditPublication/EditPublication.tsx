import { useEffect, useState } from "react"
import { IPage } from "types/Page.type"
import { getTemplateBySlugAndPageSlugProps } from "types/Template.type"

import { EditPublicationContent } from "./EditPublicationContent"

type EditPublicationProps = {
  initialPageData: IPage | undefined
  initialTemplateData: getTemplateBySlugAndPageSlugProps | undefined
}

export function EditPublication({
  initialPageData,
  initialTemplateData,
}: EditPublicationProps) {
  const [pageData, setPageData] = useState(initialPageData)
  const [templateData, setTemplateData] = useState(initialTemplateData)

  useEffect(() => {
    setPageData(initialPageData)
    setTemplateData(initialTemplateData)
  }, [initialPageData, initialTemplateData])

  return (
    <div className="bg-slate-100 fixed inset-0">
      <EditPublicationContent pageData={pageData} templateData={templateData} />
    </div>
  )
}
