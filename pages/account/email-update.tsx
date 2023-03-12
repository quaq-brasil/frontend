import { EmailUpdate } from "layouts/Workflows/EmailUpdate/EmailUpdate"
import { GetServerSideProps } from "next"
import { api } from "services/api"
import { useUpdateUser } from "services/hooks/useUser/useUpdateUser"
import { useUser } from "services/hooks/useUser/useUser"
import { IUpdateUser, IUser } from "types/User.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

type EmailUpdatePageProps = {
  data: IUser
}

export default function EmailUpdatePage({ data }: EmailUpdatePageProps) {
  const getUser = useUser({
    options: {
      initialData: data,
    },
  })

  const updateUser = useUpdateUser()

  const handleChangeEmail = (data: IUpdateUser) => {
    updateUser.mutate({
      id: getUser.data.id,
      data: {
        email: data.email,
      },
    })
  }

  return (
    <EmailUpdate
      handleChangeEmail={handleChangeEmail}
      initialUserData={getUser.data}
    />
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
