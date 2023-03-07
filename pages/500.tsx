import { useEffect, useState } from "react"
import { useUserAuth } from "../contexts/userAuth"
import Explorer from "../layouts/main/Explorer/Explorer"
import { usePageBySlug } from "../services/hooks/usePage/usePageBySlug"
import { IPage } from "../types/Page.type"

export default function Custom500() {
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
  })

  return (
    <Explorer
      isLoggedIn={isLoggedIn}
      initialPageData={getPage?.data as IPage}
      initialTemplatesData={getPage?.data?.templates}
    />
  )
}
