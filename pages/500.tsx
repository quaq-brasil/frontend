import { useUserAuth } from "contexts/userAuth"
import { Explorer } from "layouts/main/Explorer/Explorer"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"
import { useEffect, useState } from "react"
import { usePageBySlug } from "services/hooks/usePage/usePageBySlug"
import { IPage } from "types/Page.type"

export default function Custom500() {
  const text = useTranslation().t

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
    slug: text("explorer:pageslug"),
  })

  return (
    <>
      <Head>
        <title>{`${text("explorer:pagetitle")}`}</title>
        <meta name="description" content={text("explorer:pagedescription")} />
      </Head>
      <Explorer
        isLoggedIn={isLoggedIn}
        initialPageData={getPage?.data as IPage}
        initialTemplatesData={getPage?.data?.templates}
      />
    </>
  )
}
