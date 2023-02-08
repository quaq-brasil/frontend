import { useRouter } from "next/router"
import { useUserAuth } from "../../../../contexts/userAuth"
import { CreatePage } from "../../../../layouts/Onboarding/CreatePage/CreatePage"
import { useCreatePage } from "../../../../services/hooks/usePage/useCreatePage"
import { useWorkspace } from "../../../../services/hooks/useWorkspace/useWorkspace"
import { IUpdatePage } from "../../../../types/Page.type"
import { pageUrls } from "../../../../utils/pagesUrl"

export default function CreatePagePage() {
  const { user } = useUserAuth()

  const workspaceResponse = useWorkspace({
    id: user?.workspace_id ? user?.workspace_id : "63d68863688c6d9d82a5f648",
  })

  const createPage = useCreatePage()

  const router = useRouter()

  const handleCreatePage = (data: IUpdatePage) => {
    createPage.mutate(
      {
        data: {
          name: data.name || "",
          url: data.url || "",
          description: data.description || "",
          workspace_id: user?.workspace_id
            ? user?.workspace_id
            : "63b7543e7d02f98b8692255d",
          avatar_url: data.avatar_url || "",
          background_url: data.background_url || "",
          is_stripe_active: false,
          stripe_id: "",
          trackers: {},
        },
      },
      {
        onSuccess: (pageData) => {
          const { url } = pageData
          router.push(pageUrls.pageSettings({ pageSlug: url }))
        },
      }
    )
  }

  return (
    <CreatePage
      handleCreatePage={handleCreatePage}
      initialWorkspaceData={workspaceResponse?.data}
    />
  )
}
