import ProfileAdvanced from "../../layouts/main/ProfileAdvanced/ProfileAdvanced"
import { useUser } from "../../services/hooks/useUser/useUser"
import { IUser } from "../../types/User.type"

export default function ProfileAvancedPage() {
  const getUser = useUser({})

  return <ProfileAdvanced userData={getUser?.data as IUser} />
}
