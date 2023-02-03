import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUpdateUser } from "../../../types/User.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { SignupContent } from "./SignupContent"

type SignUpProps = {
  headerImageUrl: string
}

export default function SignUp() {
  const text = useTranslation().t

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
    setUserData({
      ...userData,
      name: newData.name || userData?.name,
      email: newData.email || userData?.email,
      password: newData.password || userData?.password,
      avatar_url: newData.avatar_url || userData?.avatar_url,
    })
    handleUpdateIsUpdating(true)
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("signup:cancel")}
          onClick={() => pageUrls.Back()}
        />,
        <div key={2}>
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
          text={text("signup:cancel")}
          onClick={() => pageUrls.Back()}
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
      <SignupContent
        handleUpdateUserData={handleUpdateUserData}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        isUpdating={isUpdating}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
