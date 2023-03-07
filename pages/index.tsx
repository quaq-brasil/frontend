import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import { useUserAuth } from "../contexts/userAuth"
import Explorer from "../layouts/main/Explorer/Explorer"
import { api } from "../services/api"
import { usePageBySlug } from "../services/hooks/usePage/usePageBySlug"
import { IPage } from "../types/Page.type"
import { RedirectNotFoundVerify } from "../utils/404Redirect"

type ConsumerPagePageProps = {
  pageData: IPage
}

export default function Home({ pageData }: ConsumerPagePageProps) {
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
    slug: "quaq",
    options: { initialData: pageData },
  })

  return (
    <Explorer
      isLoggedIn={isLoggedIn}
      initialPageData={getPage?.data as IPage}
      initialTemplatesData={getPage?.data?.templates}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  async function getPage() {
    const { data: pageData } = await api.get(`/pages/slug/quaq`)

    return {
      pageData: { pageData },
    }
  }

  return await RedirectNotFoundVerify(getPage, ctx)
}
