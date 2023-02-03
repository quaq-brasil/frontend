import { useUserAuth } from "../../contexts/userAuth"
import { PasswordUpdate } from "../../layouts/Workflows/PasswordUpdate/PasswordUpdate"
import { useUpdateUser } from "../../services/hooks/useUser/useUpdateUser"
import { IUpdateUser } from "../../types/User.type"

export default function PasswordUpdatePage() {
  const { user } = useUserAuth()

  const updateUser = useUpdateUser()

  function handleUpdateUser(data: IUpdateUser) {
    updateUser.mutate({
      id: "63d91dfba01035ef4040fe55",
      data: {
        password: data.password || "",
      },
    })
  }

  return (
    <PasswordUpdate
      initialUserData={user}
      handleUpdateUser={handleUpdateUser}
    />
  )
}
