import { useUserAuth } from "contexts/userAuth"
import { Explorer } from "layouts/main/Explorer/Explorer"
import { GetStaticProps } from "next"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"
import { api } from "services/api"
import { usePageBySlug } from "services/hooks/usePage/usePageBySlug"
import { IPage } from "types/Page.type"

type ConsumerPagePageProps = {
  pageData: IPage
}

export default function Home({ pageData }: ConsumerPagePageProps) {
  const text = useTranslation().t

  const { isLoggedIn } = useUserAuth()

  const getPage = usePageBySlug({
    slug: text("explorer:pageslug"),
    options: { placeholderData: pageData },
  })

  return (
    <>
      <Head>
        <title>{`${text("explorer:pagetitle")}`}</title>
        <meta name="description" content={text("explorer:pagedescription")} />
        <meta property="og:url" content="https://quaq.me" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${text("explorer:pagetitle")}`} />
        <meta
          property="og:description"
          content={text("explorer:pagedescription")}
        />
        <meta property="og:image" content={getPage?.data?.avatar_url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="quaq.me" />
        <meta property="twitter:url" content="https://quaq.me" />
        <meta name="twitter:title" content={`${text("explorer:pagetitle")}`} />
        <meta
          name="twitter:description"
          content={text("explorer:pagedescription")}
        />
        <meta name="twitter:image" content={getPage?.data?.avatar_url}></meta>
      </Head>
      <Explorer
        isLoggedIn={isLoggedIn}
        initialPageData={getPage?.data as IPage}
        initialTemplatesData={getPage?.data?.templates}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get(`/pages/slug/quaq`)

  let slug = "quaq"

  if (ctx.locale !== "en") {
    slug = "quaq-br"
  }

  return { props: { pageData: { data }, pageSlug: slug }, revalidate: 1 }
}
