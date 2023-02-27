import { GetServerSideProps } from "next"
import UserDelete from "../../layouts/main/UserDelete/UserDelete"
import { api } from "../../services/api"
import { useDeleteUser } from "../../services/hooks/useUser/useDeleteUser"
import { useUser } from "../../services/hooks/useUser/useUser"
import { IUser } from "../../types/User.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "../../utils/404Redirect"
import { withAuth } from "../../utils/withAuth"

type UserDeletePageProps = {
  data: IUser
}

export default function UserDeletePage({ data }: UserDeletePageProps) {
  const getUser = useUser({
    options: {
      initialData: data,
    },
  })

  const deleteUser = useDeleteUser({ id: "63d26f06ea1e68c873e97ab0" })

  function handleDeleteUser() {
    deleteUser.mutate()
  }

  return (
    <UserDelete
      initialUserData={getUser?.data}
      handleDeleteUser={handleDeleteUser}
    />
  )
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    async function test({ cookies }: redirectNotFoundVerifyProps) {
      const { data } = await api.get("users", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return data
    }

    return await RedirectNotFoundVerify(test, ctx, cookies, payload)
  }
)
