import Profile from "../../layouts/main/Profile/Profile"
import { useUpdateUser } from "../../services/hooks/useUser/useUpdateUser"
import { useUser } from "../../services/hooks/useUser/useUser"
import { IUser, IUserUpdate } from "../../types/User.type"

export default function ProfilePage() {
  const getUser = useUser({ id: "63d44488cbb9780ad98047bb" })

  const updateUser = useUpdateUser()

  function handleUserUpdate(data: IUserUpdate) {
    updateUser.mutate({
      id: "63d44488cbb9780ad98047bb",
      data,
    })
  }

  return (
    <Profile
      userData={getUser?.data as IUser}
      handleUserUpdate={handleUserUpdate}
    />
  )
}
