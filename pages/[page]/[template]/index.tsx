import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { useUserAuth } from "../../../contexts/userAuth"
import TemplateExecution from "../../../layouts/main/TemplateExecution/TemplateExecution"
import { api } from "../../../services/api"
import { useTemplateBySlugAndPageSlug } from "../../../services/hooks/useTemplate/useTemplateByUrlAndPageUrl"
import { getTemplateBySlugAndPageSlugProps } from "../../../types/Template.type"
import { RedirectNotFoundVerify } from "../../../utils/404Redirect"
import { appParseCookies } from "../../../utils/cookies"

type TemplateExecutionPageProps = {
  pageSlug: string
  templateSlug: string
  pageAndTemplateData: getTemplateBySlugAndPageSlugProps
}

export default function TemplateExecutionPage({
  pageSlug,
  templateSlug,
  pageAndTemplateData,
}: TemplateExecutionPageProps) {
  const { user } = useUserAuth()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (user && user.type == "registered") {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [user])

  const getTemplateAndPage = useTemplateBySlugAndPageSlug({
    slug: templateSlug,
    page_slug: pageSlug,
    options: {
      initialData: pageAndTemplateData,
    },
  })

  return (
    <TemplateExecution
      isLoggedIn={isLoggedIn}
      initialData={getTemplateAndPage.data}
    />
  )
}

type Params = {
  page: string
  template: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  async function getPageAndTemplate() {
    const { page, template } = ctx.params as Params

    const cookies = appParseCookies(ctx.req)

    const { data } = await api.get(`/templates/${page}/${template}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })

    return {
      pageSlug: page,
      templateSlug: template,
      pageAndTemplateData: { data },
    }
  }

  return await RedirectNotFoundVerify(getPageAndTemplate, ctx)
}
