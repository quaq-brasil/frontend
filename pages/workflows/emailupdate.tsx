import { EmailUpdate } from "../../layouts/Workflows/EmailUpdate/EmailUpdate"
import { useUpdateUser } from "../../services/hooks/useUser/useUpdateUser"
import { useUser } from "../../services/hooks/useUser/useUser"

export default function EmailUpdatePage() {
  const response = useUser({
    id: "63d26f06ea1e68c873e97ab0",
  })

  const updateUser = useUpdateUser()

  const handleChangeEmail = (email: string) => {
    updateUser.mutate({
      data: {
        email: email,
      },
      id: "63d26f06ea1e68c873e97ab0",
    })
  }

  return (
    <EmailUpdate handleChangeEmail={handleChangeEmail} data={response?.data} />
  )
}
