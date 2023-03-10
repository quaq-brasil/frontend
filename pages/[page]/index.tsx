import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { useUserAuth } from "../../contexts/userAuth"
import ConsumerPage from "../../layouts/main/ConsumerPage/ConsumerPage"
import { api } from "../../services/api"
import { usePageBySlug } from "../../services/hooks/usePage/usePageBySlug"
import { IPage } from "../../types/Page.type"
import { RedirectNotFoundVerify } from "../../utils/404Redirect"
import { appParseCookies } from "../../utils/cookies"

type ConsumerPagePageProps = {
  pageSlug: string
  pageData: IPage
}

export default function ConsumerPagePage({
  pageSlug,
  pageData,
}: ConsumerPagePageProps) {
  const { user } = useUserAuth()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (user && user.id) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [user])

  const getPage = usePageBySlug({
    slug: pageSlug,
    options: {
      initialData: pageData,
    },
  })

  return (
    <ConsumerPage
      isLoggedIn={isLoggedIn}
      initialPageData={getPage?.data}
      initialTemplatesData={getPage?.data?.templates || []}
    />
  )
}

type Params = {
  page: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  async function getPage() {
    const { page } = ctx.params as Params

    const cookies = appParseCookies(ctx.req)

    const { data } = await api.get(`/pages/slug/${page}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })

    return {
      pageData: { data },
      pageSlug: page,
    }
  }

  return await RedirectNotFoundVerify(getPage, ctx)
}
