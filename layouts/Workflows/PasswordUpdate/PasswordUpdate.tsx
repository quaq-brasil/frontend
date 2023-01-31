import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUpdateUser, IUser } from "../../../types/User.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { PasswordUpdateContent } from "./PasswordUpdateContent"

type PasswordUpdateProps = {
  initialUserData: IUser | undefined
  handleUpdateUser: (data: IUpdateUser) => void
}

export function PasswordUpdate({
  initialUserData,
  handleUpdateUser,
}: PasswordUpdateProps) {
  const text = useTranslation().t

  const [userData, setUserData] = useState<IUpdateUser>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(false)

  useEffect(() => {
    if (initialUserData) {
      setUserData(initialUserData)
    }
  }, [initialUserData])

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  const router = useRouter()

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("pwupdate:tab1")}
          onClick={() => router.push(pageUrls.meSettings())}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("pwupdate:update")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("pwupdate:tab1")}
          onClick={() => router.push(pageUrls.meSettings())}
        />,
      ]
    }
  }

  function loadHeader() {
    return (
      <Header background_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80">
        <Tag
          variant="img-txt"
          text={userData?.name || ""}
          img_url={userData?.avatar_url || ""}
          onClick={() => router.push(pageUrls.meSettings())}
        />
        <Tag variant="txt" text={text("pwupdate:titletag")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <PasswordUpdateContent
        handleUpdateUser={handleUpdateUser}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        runUpdate={runUpdate}
        isUpdating={isUpdating}
        setPasswordMatch={setPasswordMatch}
        passwordMatch={passwordMatch}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
