import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IUpdateUser, IUser } from "types/User.type"
import { pageUrls } from "utils/pagesUrl"
import { ProfileContent } from "./ProfileContent"

type ProfileProps = {
  initialUserData: IUser | null
  handleUserUpdate: (userData: IUpdateUser) => void
}

export function Profile({ initialUserData, handleUserUpdate }: ProfileProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [userData, setUserData] = useState<IUpdateUser>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

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
      handleUserUpdate(userData)
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("profile:back")}
          onClick={() => {
            handleUpdateIsUpdating(false)
            handleUpdateRunUpdate(false)
            router.push(pageUrls.adm())
          }}
        />,
        <div key={2} className={`w-fit h-fit xl:hidden`}>
          <Tag
            variant="txt"
            text={text("profile:update")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("profile:back")}
          onClick={() => {
            handleUpdateIsUpdating(false)
            handleUpdateRunUpdate(false)
            router.push(pageUrls.adm())
          }}
        />,
      ]
    }
  }

  function loadHeader() {
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
        />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <ProfileContent
        handleUpdateUserData={handleUpdateUserData}
        userData={userData}
        isUpdating={isUpdating}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
