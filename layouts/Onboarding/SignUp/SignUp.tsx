import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUpdateUser } from "../../../types/User.type"
import { SignUpContent } from "./SignUpContent"

type SignUpProps = {
  handleCreateUser: (data: IUpdateUser) => void
}

export default function SignUp({ handleCreateUser }: SignUpProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [userData, setUserData] = useState<IUpdateUser>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleUpdateUserData(newData: IUpdateUser) {
    setUserData((state) => {
      return {
        ...state,
        ...newData,
      } as IUpdateUser
    })
  }

  useEffect(() => {
    if (userData) {
      handleCreateUser(userData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("signup:back")}
          onClick={() => router.back()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("signup:signup")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("signup:back")}
          onClick={() => router.back()}
        />,
      ]
    }
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      <Header
        background_url={
          "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag variant="txt" text={text("signup:titletag")} />
      </Header>
      <SignUpContent
        handleUpdateUserData={handleUpdateUserData}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        isUpdating={isUpdating}
        runUpdate={runUpdate}
        userData={userData}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
