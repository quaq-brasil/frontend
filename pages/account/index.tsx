import { Profile } from "layouts/main/Profile/Profile"
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

type ProfilePageProps = {
  data: IUser
}

export default function ProfilePage({ data }: ProfilePageProps) {
  const text = useTranslation().t

  const getUser = useUser({
    options: {
      initialData: data,
    },
  })

  const updateUser = useUpdateUser()

  function handleUserUpdate(data: IUpdateUser) {
    updateUser.mutate({
      id: getUser.data.id,
      data: {
        name: data.name,
        avatar_url: data.avatar_url,
      },
    })
  }

  return (
    <>
      <Head>
        <title>{`${text("profile:pagetitle")}`}</title>
        <meta name="description" content={text("profile:pagedescription")} />
      </Head>
      <Profile
        initialUserData={getUser?.data}
        handleUserUpdate={handleUserUpdate}
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

      return { data }
    }

    return await RedirectNotFoundVerify(getUser, ctx, cookies, payload)
  }
)
