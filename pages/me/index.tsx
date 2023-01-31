import Profile from "../../layouts/main/Profile/Profile"
import { useUpdateUser } from "../../services/hooks/useUser/useUpdateUser"
import { useUser } from "../../services/hooks/useUser/useUser"
import { IUpdateUser } from "../../types/User.type"

export default function ProfilePage() {
  const getUser = useUser({ id: "63d44488cbb9780ad98047bb" })

  const updateUser = useUpdateUser()

  function handleUserUpdate(data: IUpdateUser) {
    updateUser.mutate({
      id: "63d44488cbb9780ad98047bb",
      data: {
        name: data.name,
        avatar_url: data.avatar_url,
      },
    })
  }

  return (
    <Profile
      initialUserData={getUser?.data}
      handleUserUpdate={handleUserUpdate}
    />
  )
}
