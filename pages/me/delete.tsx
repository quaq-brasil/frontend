import UserDelete from "../../layouts/main/UserDelete/UserDelete"
import { useDeleteUser } from "../../services/hooks/useUser/useDeleteUser"
import { useUser } from "../../services/hooks/useUser/useUser"

export default function UserDeletePage() {
  const getUser = useUser({ id: "63d26f06ea1e68c873e97ab0" })

  const deleteUser = useDeleteUser({ id: "63d26f06ea1e68c873e97ab0" })

  function handleDeleteUser() {
    deleteUser.mutate()
  }

  return (
    <UserDelete
      initialUserData={getUser?.data}
      handleDeleteUser={handleDeleteUser}
    />
  )
}
