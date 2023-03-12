import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IUser } from "types/User.type"
import { pageUrls } from "utils/pagesUrl"
import { UserDeleteContent } from "./UserDeleteContent"

type UserDeleteProps = {
  initialUserData: IUser | undefined
  handleDeleteUser: () => void
}

export default function UserDelete({
  handleDeleteUser,
  initialUserData,
}: UserDeleteProps) {
  const text = useTranslation().t

  const [userData, setUserData] = useState<IUser>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  useEffect(() => {
    setUserData(initialUserData)
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
          text={text("userdelete:back")}
          onClick={() => router.push(pageUrls.meSettings())}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("userdelete:delete")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("userdelete:back")}
          onClick={() => router.push(pageUrls.meSettings())}
        />,
      ]
    }
  }

  function handleHeader() {
    return (
      <Header
        background_url={
          "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag
          variant="img-txt"
          text={userData?.name || ""}
          img_url={userData?.avatar_url || ""}
          onClick={() => router.push(pageUrls.meSettings())}
        />
        <Tag
          variant="txt"
          text={text("userdelete:advanced")}
          onClick={() => router.push(pageUrls.meSettings("advanced"))}
        />
        <Tag variant="txt" text={text("userdelete:delete")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      <>{handleHeader()}</>
      <UserDeleteContent
        handleDeleteUser={handleDeleteUser}
        userData={userData}
        isUpdating={isUpdating}
        runUpdate={runUpdate}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
