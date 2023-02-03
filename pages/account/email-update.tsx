import { useUserAuth } from "../../contexts/userAuth"
import { EmailUpdate } from "../../layouts/Workflows/EmailUpdate/EmailUpdate"
import { useUpdateUser } from "../../services/hooks/useUser/useUpdateUser"
import { IUpdateUser } from "../../types/User.type"

export default function EmailUpdatePage() {
  const { user } = useUserAuth()

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
    <EmailUpdate handleChangeEmail={handleChangeEmail} initialUserData={user} />
  )
}
