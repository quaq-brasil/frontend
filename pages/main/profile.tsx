import Profile from "../../layouts/main/Profile/Profile"
import { useUpdateUser } from "../../services/hooks/useUser/useUpdateUser"
import { useUser } from "../../services/hooks/useUser/useUser"
import { IUser, IUserUpdate } from "../../types/User.type"

export default function ProfilePage() {
  const getUser = useUser({ id: "63d26f06ea1e68c873e97ab0" })

  const updateUser = useUpdateUser()

  function handleUserUpdate(data: IUserUpdate) {
    updateUser.mutate({
      id: "63d26f06ea1e68c873e97ab0",
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
