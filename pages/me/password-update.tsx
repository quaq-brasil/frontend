import { PasswordUpdate } from "../../../layouts/Workflows/PasswordUpdate/PasswordUpdate"
import { useUpdateUser } from "../../../services/hooks/useUser/useUpdateUser"
import { useUser } from "../../../services/hooks/useUser/useUser"

export default function PasswordUpdatePage() {
  const response = useUser({
    id: "63d26f06ea1e68c873e97ab0",
  })

  const updateUser = useUpdateUser()

  return <PasswordUpdate data={response?.data} />
}
