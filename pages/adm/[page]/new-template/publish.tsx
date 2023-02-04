import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import PublishTemplate from "../../../../layouts/main/PublishTemplate/PublishTemplate"
import { usePageByUrl } from "../../../../services/hooks/usePage/usePageByUrl"
import { useCreateTemplate } from "../../../../services/hooks/useTemplate/useCreateTemplate"
import { IPage } from "../../../../types/Page.type"
import { ITemplate } from "../../../../types/Template.type"

type PublishTemplatePageProps = {
  page: string
}

export default function PublishTemplatePage({
  page,
}: PublishTemplatePageProps) {
  const getPage = usePageByUrl({
    url: page,
  })

  const createTemplate = useCreateTemplate()

  const handleCreateTemplate = (data: ITemplate) => {
    createTemplate.mutate({
      data,
    })
  }

  return (
    <PublishTemplate
      initialPageData={getPage?.data as IPage}
      handleCreateTemplate={handleCreateTemplate}
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
