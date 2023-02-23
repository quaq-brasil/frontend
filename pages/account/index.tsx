import { useUserAuth } from "../../contexts/userAuth"
import Profile from "../../layouts/main/Profile/Profile"
import { useUpdateUser } from "../../services/hooks/useUser/useUpdateUser"
import { IUpdateUser } from "../../types/User.type"

export default function ProfilePage() {
  const { user } = useUserAuth()

  const updateUser = useUpdateUser()

  function handleUserUpdate(data: IUpdateUser) {
    updateUser.mutate({
      id: user?.id as string,
      data: {
        name: data.name,
        avatar_url: data.avatar_url,
      },
    })
  }

  return <Profile initialUserData={user} handleUserUpdate={handleUserUpdate} />
}
