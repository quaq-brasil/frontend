import { useUserAuth } from "contexts/userAuth"
import { TemplateExecution } from "layouts/main/TemplateExecution/TemplateExecution"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { api } from "services/api"
import { useTemplateBySlugAndPageSlug } from "services/hooks/useTemplate/useTemplateByUrlAndPageUrl"
import { getTemplateBySlugAndPageSlugProps } from "types/Template.type"

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
      placeholderData: pageAndTemplateData,
      retry: false,
    },
  })

  type PageAndTemplateProps = {
    templateTitle: string
    pageTitle: string
    pageDescription: string
  }

  const [pageInfo, setPageInfo] = useState<PageAndTemplateProps | null>(null)

  useEffect(() => {
    if (getTemplateAndPage) {
      let pageTitle =
        getTemplateAndPage?.data?.Page?.title?.charAt(0).toUpperCase() +
        getTemplateAndPage?.data?.Page?.title?.slice(1).toLowerCase()

      let templateTitle =
        getTemplateAndPage?.data?.title?.charAt(0).toUpperCase() +
        getTemplateAndPage?.data?.title?.slice(1).toLowerCase()

      setPageInfo({
        pageTitle: pageTitle,
        templateTitle: templateTitle,
        pageDescription: getTemplateAndPage?.data?.Page?.description,
      })
    }
  }, [getTemplateAndPage])

  return (
    <>
      <Head>
        <title>{`${pageInfo?.pageTitle} - ${pageInfo?.templateTitle}`}</title>
        <meta name="description" content={pageInfo?.pageDescription}></meta>
        <meta property="og:url" content="https://quaq.me" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${pageInfo?.pageTitle} - ${pageInfo?.templateTitle}`}
        />
        <meta property="og:description" content={pageInfo?.pageDescription} />
        <meta
          property="og:image"
          content={getTemplateAndPage?.data?.shortcut_image}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="quaq.me" />
        <meta property="twitter:url" content="https://quaq.me" />
        <meta
          name="twitter:title"
          content={`${pageInfo?.pageTitle} - ${pageInfo?.templateTitle}`}
        />
        <meta name="twitter:description" content={pageInfo?.pageDescription} />
        <meta
          name="twitter:image"
          content={getTemplateAndPage?.data?.shortcut_image}
        ></meta>
      </Head>
      <TemplateExecution
        isLoggedIn={isLoggedIn}
        initialData={getTemplateAndPage?.data}
      />
    </>
  )
}

type Params = {
  page: string
  template: string
} & ParsedUrlQuery

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { page, template } = ctx.params as Params

  try {
    const { data } = await api.get(`/templates/${page}/${template}`)

    return {
      props: {
        pageSlug: page,
        templateSlug: template,
        pageAndTemplateData: { data },
      },
      revalidate: 1,
    }
  } catch (err) {
    return {
      props: {
        pageSlug: page,
        templateSlug: template,
        pageAndTemplateData: null,
      },
      revalidate: 1,
    }
  }
}
