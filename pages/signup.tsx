import { useRouter } from "next/router"
import { useState } from "react"
import SignUp from "../layouts/Onboarding/SignUp/SignUp"

import { useCreateUser } from "../services/hooks/useUser/useCreateUser"
import { useUpdateUser } from "../services/hooks/useUser/useUpdateUser"
import { IUpdateUser } from "../types/User.type"
import { pageUrls } from "../utils/pagesUrl"

export default function LoginPage() {
  const router = useRouter()

  const createUser = useCreateUser()

  const updateUser = useUpdateUser()

  const [userId, setUserId] = useState<string>("")

  function handleCreateUser(data: IUpdateUser) {
    createUser.mutate(
      { data: {} },
      {
        onSuccess: (data) => {
          setUserId(data.id)
        },
      }
    )
    updateUser.mutate(
      {
        id: userId,
        data: {
          avatar_url: data.avatar_url,
          email: data.email,
          name: data.name,
          password: data.password,
        },
      },
      {
        onSuccess: () => {
          router.push(
            pageUrls.workspaceSettings({ settings: "first-workspace" })
          )
        },
      }
    )
  }

  return <SignUp handleCreateUser={handleCreateUser} />
}
