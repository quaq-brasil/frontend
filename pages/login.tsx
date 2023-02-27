import { useRouter } from "next/router"
import Login from "../layouts/Onboarding/LogIn/LogIn"

import { useLogin } from "../services/hooks/useUser/useLogin"
import { IUserLogin } from "../types/User.type"
import { pageUrls } from "../utils/pagesUrl"

export default function LoginPage() {
  const loginUser = useLogin()

  const router = useRouter()
  function handleUserLogin(data: IUserLogin) {
    loginUser.mutate(
      {
        email: data.email || "",
        password: data.password || "",
      },
      {
        onSuccess: () => {
          router.push(pageUrls.adm())
        },
      }
    )
  }

  return <Login handleUserLogin={handleUserLogin} />
}
