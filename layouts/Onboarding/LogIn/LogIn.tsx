import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IUserLogin } from "types/User.type"
import { pageUrls } from "utils/pagesUrl"
import { LoginContent } from "./LogInContent"

type LoginProps = {
  handleUserLogin: (data: IUserLogin) => void
}

export function Login({ handleUserLogin }: LoginProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [userData, setUserData] = useState<IUserLogin>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleUpdateUserData(newData: IUserLogin) {
    setUserData((state) => {
      return {
        ...state,
        ...newData,
      } as IUserLogin
    })
    handleUpdateIsUpdating(true)
  }

  useEffect(() => {
    if (userData) {
      handleUpdateRunUpdate(false)
      handleUpdateIsUpdating(false)
      handleUserLogin(userData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("login:back")}
          onClick={() => router.push(pageUrls.home())}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("login:update")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("login:back")}
          onClick={() => router.push(pageUrls.home())}
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
        <Tag variant="txt" text={text("login:titletag")} />
      </Header>
      <LoginContent
        isUpdating={isUpdating}
        handleUpdateUserData={handleUpdateUserData}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
