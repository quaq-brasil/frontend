import ProfileAdvanced from "../../../layouts/main/ProfileAdvanced/ProfileAdvanced"
import { useUser } from "../../../services/hooks/useUser/useUser"
import { IUser } from "../../../types/User.type"

export default function ProfileAvancedPage() {
  const getUser = useUser({ id: "63d26f06ea1e68c873e97ab0" })

  return <ProfileAdvanced userData={getUser?.data as IUser} />
}
