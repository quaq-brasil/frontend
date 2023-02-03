import { EmailUpdate } from "../../layouts/Workflows/EmailUpdate/EmailUpdate"
import { useUpdateUser } from "../../services/hooks/useUser/useUpdateUser"
import { useUser } from "../../services/hooks/useUser/useUser"
import { IUpdateUser } from "../../types/User.type"

export default function EmailUpdatePage() {
  const response = useUser({
    id: "63d44488cbb9780ad98047bb",
  })

  const updateUser = useUpdateUser()

  const handleChangeEmail = (data: IUpdateUser) => {
    updateUser.mutate({
      id: "63d44488cbb9780ad98047bb",
      data: {
        email: data.email || "",
      },
    })
  }

  return (
    <EmailUpdate
      handleChangeEmail={handleChangeEmail}
      initialUserData={response?.data}
    />
  )
}
