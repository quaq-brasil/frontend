import { useUserAuth } from "contexts/userAuth"
import { ConsumerPage } from "layouts/main/ConsumerPage/ConsumerPage"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { api } from "services/api"
import { usePageBySlug } from "services/hooks/usePage/usePageBySlug"
import { IPage } from "types/Page.type"

type ConsumerPagePageProps = {
  pageSlug: string
  pageData: IPage
}

export default function ConsumerPagePage({
  pageSlug,
  pageData,
}: ConsumerPagePageProps) {
  const { isLoggedIn } = useUserAuth()

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
        <title>{getPage?.data?.title}</title>
        <meta name="description" content={getPage?.data?.description}></meta>
        <meta property="og:url" content="https://quaq.me" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={getPage?.data?.title} />
        <meta property="og:description" content={getPage?.data?.description} />
        <meta property="og:image" content={getPage?.data?.avatar_url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="quaq.me" />
        <meta property="twitter:url" content="https://quaq.me" />
        <meta name="twitter:title" content={getPage?.data?.title} />
        <meta name="twitter:description" content={getPage?.data?.description} />
        <meta name="twitter:image" content={getPage?.data?.avatar_url}></meta>
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
