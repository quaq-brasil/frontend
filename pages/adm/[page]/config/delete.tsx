import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import PageDelete from "../../../../layouts/main/PageDelete/PageDelete"
import { useDeletePage } from "../../../../services/hooks/usePage/useDeletePage"
import { usePageBySlug } from "../../../../services/hooks/usePage/usePageBySlug"
import { useUser } from "../../../../services/hooks/useUser/useUser"
import { IPage } from "../../../../types/Page.type"
import { IUser } from "../../../../types/User.type"
import { pageUrls } from "../../../../utils/pagesUrl"

type PageDeletePageProps = {
  page: string
}

export default function PageDeletePage({ page }: PageDeletePageProps) {
  const getUser = useUser({})

  const getPage = usePageBySlug({
    slug: page,
  })

  const deletePage = useDeletePage()

  const router = useRouter()

  function handleDeletePage() {
    deletePage.mutate(
      { id: getPage?.data.id as string },
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

type Params = {
  page: string
} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { page } = params as Params

  return {
    props: {
      page,
    },
  }
}
