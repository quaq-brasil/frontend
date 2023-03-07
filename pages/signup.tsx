import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import SignUp from "../layouts/Onboarding/SignUp/SignUp"

import { useCreateUser } from "../services/hooks/useUser/useCreateUser"
import { useLogin } from "../services/hooks/useUser/useLogin"
import { useUpdateUser } from "../services/hooks/useUser/useUpdateUser"
import { IUpdateUser } from "../types/User.type"
import { isTokenExpired } from "../utils/auth"
import { appParseCookies } from "../utils/cookies"
import { pageUrls } from "../utils/pagesUrl"

export default function LoginPage() {
  const router = useRouter()

  const createUser = useCreateUser()

  const updateUser = useUpdateUser()

  const loginUser = useLogin()

  function handleCreateUser(newData: IUpdateUser) {
    createUser.mutate(
      { data: {} },
      {
        onSuccess: (data) => {
          updateUser.mutate(
            {
              id: data.id,
              data: {
                avatar_url: newData.avatar_url,
                email: newData.email,
                name: newData.name,
                password: newData.password,
              },
            },
            {
              onSuccess: (data) => {
                loginUser.mutate(
                  {
                    email: data.email,
                    password: newData.password,
                  },
                  {
                    onSuccess: () => {
                      router.push(
                        pageUrls.workspaceSettings({ settings: "setup" })
                      )
                    },
                  }
                )
              },
            }
          )
        },
      }
    )
  }

  return <SignUp handleCreateUser={handleCreateUser} />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = appParseCookies(ctx.req)

  if (cookies.token && !isTokenExpired(cookies.token)) {
    return {
      redirect: {
        permanent: false,
        destination: pageUrls.adm(),
      },
    }
  }

  return {
    props: {},
  }
}
