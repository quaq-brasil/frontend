import { Login } from "layouts/Onboarding/LogIn/LogIn"
import { GetServerSideProps } from "next"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"
import { useRouter } from "next/router"

import { useLogin } from "services/hooks/useUser/useLogin"
import { IUserLogin } from "types/User.type"
import { isTokenExpired } from "utils/auth"
import { appParseCookies } from "utils/cookies"
import { pageUrls } from "utils/pagesUrl"

export default function LoginPage() {
  const text = useTranslation().t

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

  return (
    <>
      <Head>
        <title>{`${text("login:pagetitle")}`}</title>
        <meta name="description" content={text("login:pagedescription")} />
      </Head>
      <Login handleUserLogin={handleUserLogin} />
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
