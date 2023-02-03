import { useUserAuth } from "../../contexts/userAuth"
import { PasswordRecovery } from "../../layouts/Workflows/PasswordRecovery/PasswordRecovery"
import { useUpdateUser } from "../../services/hooks/useUser/useUpdateUser"

export default function PasswordRecoveryPage() {
  const { user } = useUserAuth()

  const updateUser = useUpdateUser()

  return <PasswordRecovery />
}
