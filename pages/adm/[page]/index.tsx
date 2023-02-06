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

  const [workspaces, setWorkspaces] = useState<IWorkspace[]>()

  const getCurrentPage = usePageByUrl({ url: page })

  useEffect(() => {
    if (user) {
      getAllWorkspaces.mutate(
        {
          id: user.id as string,
        },
        {
          onSuccess: (data) => {
            setWorkspaces(data)
          },
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <CreatorPage
      initialWorkspacesData={workspaces as IWorkspace[]}
      initalCurrentPageData={getCurrentPage?.data as IPage}
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
