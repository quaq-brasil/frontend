import { LogUserIn } from "layouts/Onboarding/LogUserIn/LogUserIn"
import { GetServerSideProps } from "next"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"

import { isTokenExpired } from "utils/auth"
import { appParseCookies } from "utils/cookies"
import { pageUrls } from "utils/pagesUrl"

export default function LoginPage() {
  const text = useTranslation().t

  return (
    <>
      <Head>
        <title>{`${text("login:pagetitle")}`}</title>
        <meta name="description" content={text("login:pagedescription")} />
      </Head>
      <LogUserIn />
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
