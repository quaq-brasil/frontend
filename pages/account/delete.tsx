import { UserDelete } from "layouts/main/UserDelete/UserDelete"
import { GetServerSideProps } from "next"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"
import { api } from "services/api"
import { useDeleteUser } from "services/hooks/useUser/useDeleteUser"
import { useUser } from "services/hooks/useUser/useUser"
import { IUser } from "types/User.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

type UserDeletePageProps = {
  data: IUser
}

export default function UserDeletePage({ data }: UserDeletePageProps) {
  const text = useTranslation().t

  const getUser = useUser({
    options: {
      initialData: data,
    },
  })

  const deleteUser = useDeleteUser()

  function handleDeleteUser() {
    deleteUser.mutate({ id: getUser.data.id })
  }

  return (
    <>
      <Head>
        <title>{`${text("profile:pagetitle")}`}</title>
        <meta name="description" content={text("profile:pagedescription")} />
      </Head>
      <UserDelete
        initialUserData={getUser.data}
        handleDeleteUser={handleDeleteUser}
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
