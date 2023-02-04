import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import ConsumerPage from "../../layouts/main/ConsumerPage/ConsumerPage"
import { usePageByUrl } from "../../services/hooks/usePage/usePageByUrl"
import { useTemplatesByPageId } from "../../services/hooks/useTemplate/useTemplatesByPageId"
import { IPage } from "../../types/Page.type"
import { ITemplate } from "../../types/Template.type"

type ConsumerPagePageProps = {
  page: string
}

export default function ConsumerPagePage({ page }: ConsumerPagePageProps) {
  const [pageId, setPageId] = useState<string>()

  const getPage = usePageByUrl({
    url: page,
  })

  useEffect(() => {
    if (getPage) {
      setPageId(getPage.data.id)
    }
  }, [getPage])

  const getTemplates = useTemplatesByPageId({ id: pageId as string })

  return (
    <ConsumerPage
      initialPageData={getPage?.data as IPage}
      initialTemplatesData={getTemplates?.data as ITemplate[]}
    />
  )
}

type Params = {
  page: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { page } = params as Params

  return {
    props: {
      page,
    },
  }
}
