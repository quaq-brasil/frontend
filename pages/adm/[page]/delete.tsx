import { useRouter } from "next/router"
import PageDelete from "../../../layouts/main/PageDelete/PageDelete"
import { useDeletePage } from "../../../services/hooks/usePage/useDeletePage"
import { usePage } from "../../../services/hooks/usePage/usePage"
import { useUser } from "../../../services/hooks/useUser/useUser"
import { IPage } from "../../../types/Page.type"
import { IUser } from "../../../types/User.type"
import { pageUrls } from "../../../utils/pagesUrl"

type PageDeletePageProps = {
  userId: string
  pageId: string
}

export default function PageDeletePage({
  pageId,
  userId,
}: PageDeletePageProps) {
  const getUser = useUser({ id: "63d7c5dd4b1d81503bf6beb8" })

  const getPage = usePage({
    id: "63b754987d02f98b8692255e",
  })

  const deletePage = useDeletePage()

  const router = useRouter()

  function handleDeletePage() {
    deletePage.mutate(
      { id: "63d7c76b4b1d81503bf6bebc" },
      {
        onSuccess: () => {
          router.push(pageUrls.home())
        },
      }
    )
  }

  return (
    <PageDelete
      initialPageData={getPage?.data as IPage}
      initialUserData={getUser?.data as IUser}
      handleDeletePage={handleDeletePage}
    />
  )
}