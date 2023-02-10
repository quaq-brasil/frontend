import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { useUserAuth } from "../../../contexts/userAuth"
import CreatorPage from "../../../layouts/main/CreatorPage/CreatorPage"
import { usePageByUrl } from "../../../services/hooks/usePage/usePageByUrl"
import { useMutateGetAllWorkspacesByUserId } from "../../../services/hooks/useWorkspace/useMutateGetAllWorkspacesByUserId"
import { IPage } from "../../../types/Page.type"
import { IWorkspace } from "../../../types/Workspace.type"

type AdmSelectedPageProps = {
  page: string
}

export default function AdmSelectedPage({ page }: AdmSelectedPageProps) {
  const { user } = useUserAuth()

  const getAllWorkspaces = useMutateGetAllWorkspacesByUserId()

  const getCurrentPage = usePageByUrl({ url: page })

  const [workspaces, setWorkspaces] = useState<IWorkspace[]>()
  const [curentPage, setCurrentPage] = useState<IPage>()

  useEffect(() => {
    if (user) {
      getAllWorkspaces.mutate(
        { id: user.id as string },
        {
          onSuccess: (data) => {
            setWorkspaces(data)
          },
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (getCurrentPage?.data) {
      setCurrentPage(getCurrentPage.data)
    }
  }, [getCurrentPage])

  return (
    <CreatorPage
      initialWorkspacesData={workspaces as IWorkspace[]}
      initialCurrentPageData={curentPage as IPage}
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
