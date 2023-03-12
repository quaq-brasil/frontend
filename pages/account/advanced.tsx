import ProfileAdvanced from "layouts/main/ProfileAdvanced/ProfileAdvanced"
import { GetServerSideProps } from "next"
import { api } from "services/api"
import { useUser } from "services/hooks/useUser/useUser"
import { IUser } from "types/User.type"
import {
  RedirectNotFoundVerify,
  redirectNotFoundVerifyProps,
} from "utils/404Redirect"
import { withAuth } from "utils/withAuth"

type ProfileAdvancedPageProps = {
  user: IUser
}

export default function ProfileAdvancedPage({
  user,
}: ProfileAdvancedPageProps) {
  const getUser = useUser({
    options: {
      initialData: user,
    },
  })

  return <ProfileAdvanced userData={getUser?.data as IUser} />
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    async function getUser({ cookies }: redirectNotFoundVerifyProps) {
      const { data: user } = await api.get("users", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })

      return user
    }

    return await RedirectNotFoundVerify(getUser, ctx, cookies, payload)
  }
)
