import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import TemplateAccessControl from "../../../../layouts/main/TemplateAccessControl/TemplateAccessControl"
import { usePageByUrl } from "../../../../services/hooks/usePage/usePageByUrl"
import { useTemplateByUrl } from "../../../../services/hooks/useTemplate/useTemplateByUrl"
import { IPage } from "../../../../types/Page.type"
import { ITemplate } from "../../../../types/Template.type"

type TemplateAccessControlPageProps = {
  page: string
  template: string
}

export default function TemplateAccessControlPage({
  page,
  template,
}: TemplateAccessControlPageProps) {
  const getPage = usePageByUrl({
    url: page,
  })

  const getTemplate = useTemplateByUrl({
    url: template,
  })

  return (
    <TemplateAccessControl
      initialTemplateData={getTemplate?.data as ITemplate}
      initialPageData={getPage?.data as IPage}
    />
  )
}

type Params = {
  page: string
  template: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { page, template } = params as Params

  return {
    props: {
      page,
      template,
    },
  }
}
