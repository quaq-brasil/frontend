import { useUserAuth } from "contexts/userAuth"
import { SignUserUp } from "layouts/Onboarding/SignUserUp/SignUserUp"
import { GetServerSideProps } from "next"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"
import { useRouter } from "next/router"
import { useCreateUser } from "services/hooks/useUser/useCreateUser"
import { useLogin } from "services/hooks/useUser/useLogin"
import { useUpdateUser } from "services/hooks/useUser/useUpdateUser"
import { IUpdateUser } from "types/User.type"
import { isTokenExpired } from "utils/auth"
import { appParseCookies } from "utils/cookies"
import { pageUrls } from "utils/pagesUrl"

export default function LoginPage() {
  const text = useTranslation().t

  const router = useRouter()

  const createUser = useCreateUser()

  const updateUser = useUpdateUser()

  const loginUser = useLogin()

  const { user } = useUserAuth()

  function handleCreateUser(newData: IUpdateUser) {
    console.log("user", user)

    updateUser.mutate(
      {
        id: user?.id,
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
                router.push(pageUrls.workspaceSettings({ settings: "setup" }))
              },
            }
          )
        },
      }
    )
  }

  return (
    <>
      <Head>
        <title>{`${text("signup:pagetitle")}`}</title>
        <meta name="description" content={text("signup:pagedescription")} />
      </Head>
      <SignUserUp handleCreateUser={handleCreateUser} />
    </>
  )
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
