import { PasswordRecovery } from "../../../layouts/Workflows/PasswordRecovery/PasswordRecovery"
import { useUpdateUser } from "../../../services/hooks/useUser/useUpdateUser"
import { useUser } from "../../../services/hooks/useUser/useUser"

export default function PasswordRecoveryPage() {
  const response = useUser({
    id: "63d26f06ea1e68c873e97ab0",
  })

  const updateUser = useUpdateUser()

  return <PasswordRecovery />
}
