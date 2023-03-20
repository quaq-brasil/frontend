import { useUserAuth } from "contexts/userAuth"
import { ConsumerPage } from "layouts/main/ConsumerPage/ConsumerPage"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { api } from "services/api"
import { usePageBySlug } from "services/hooks/usePage/usePageBySlug"
import { IPage } from "types/Page.type"
import { HeadTags } from "utils/HeadTags"

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
      placeholderData: pageData,
      retry: false,
    },
  })

  return (
    <>
      <Head>
        <HeadTags
          title={getPage?.data?.title}
          description={getPage?.data?.description}
          image={getPage?.data?.avatar_url}
        />
      </Head>
      <ConsumerPage
        isLoggedIn={isLoggedIn}
        initialPageData={getPage?.data}
        initialTemplatesData={getPage?.data?.templates || []}
      />
    </>
  )
}

type Params = {
  page: string
} & ParsedUrlQuery

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { page } = ctx.params as Params
  try {
    const { data } = await api.get(`/pages/slug/${page}`)

    return { props: { pageData: { data }, pageSlug: page }, revalidate: 1 }
  } catch (err) {
    return { props: { pageData: null, pageSlug: page }, revalidate: 1 }
  }
}
