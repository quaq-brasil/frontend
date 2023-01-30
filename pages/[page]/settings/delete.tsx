import PageDelete from "../../../layouts/main/PageDelete/PageDelete"
import { useDeletePage } from "../../../services/hooks/usePage/useDeletePage"
import { usePage } from "../../../services/hooks/usePage/usePage"
import { useUser } from "../../../services/hooks/useUser/useUser"
import { IPage } from "../../../types/Page.type"
import { IUser } from "../../../types/User.type"

type PageDeletePageProps = {
  userId: string
  pageId: string
}

export default function PageDeletePage({
  pageId,
  userId,
}: PageDeletePageProps) {
  const getUser = useUser({ id: "63d68a12688c6d9d82a5f649" })

  const getPage = usePage({
    id: "63d6ab6f86257d7569799814",
  })

  const deletePage = useDeletePage()

  function handleDeletePage() {
    deletePage.mutate({ id: "63b754987d02f98b8692255e" })
  }

  return (
    <PageDelete
      initialPageData={getPage?.data as IPage}
      initialUserData={getUser?.data as IUser}
      handleDeletePage={handleDeletePage}
    />
  )
}
