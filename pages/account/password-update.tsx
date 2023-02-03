import { PasswordUpdate } from "../../layouts/Workflows/PasswordUpdate/PasswordUpdate"
import { useUpdateUser } from "../../services/hooks/useUser/useUpdateUser"
import { useUser } from "../../services/hooks/useUser/useUser"
import { IUpdateUser } from "../../types/User.type"

export default function PasswordUpdatePage() {
  const response = useUser({
    id: "63d91dfba01035ef4040fe55",
  })

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
      initialUserData={response?.data}
      handleUpdateUser={handleUpdateUser}
    />
  )
}
