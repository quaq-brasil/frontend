import { PasswordUpdate } from "layouts/Workflows/PasswordUpdate/PasswordUpdate"
import { GetServerSideProps } from "next"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"
import { api } from "services/api"
import { useUpdateUser } from "services/hooks/useUser/useUpdateUser"
import { useUser } from "services/hooks/useUser/useUser"
import { IUpdateUser, IUser } from "types/User.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

type PasswordUpdatePageProps = {
  data: IUser
}

export default function PasswordUpdatePage({ data }: PasswordUpdatePageProps) {
  const text = useTranslation().t

  const getUser = useUser({
    options: {
      initialData: data,
    },
  })

  const updateUser = useUpdateUser()

  function handleUpdateUser(data: IUpdateUser) {
    updateUser.mutate({
      id: getUser.data.id,
      data: {
        password: data.password,
      },
    })
  }

  return (
    <>
      <Head>
        <title>{`${text("profile:pagetitle")}`}</title>
        <meta name="description" content={text("profile:pagedescription")} />
      </Head>
      <PasswordUpdate
        initialUserData={getUser.data}
        handleUpdateUser={handleUpdateUser}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    async function getUser({ cookies }: redirectNotFoundVerifyProps) {
      const { data } = await api.get("users", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return data
    }

    return await RedirectNotFoundVerify(getUser, ctx, cookies, payload)
  }
)
