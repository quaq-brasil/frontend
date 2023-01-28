import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUser, IUserUpdate } from "../../../types/User.type"
import { ProfileContent } from "./ProfileContent"

type ProfileProps = {
  userData: IUser
  handleUserUpdate: (userData: IUserUpdate) => void
}

export default function Profile({ userData, handleUserUpdate }: ProfileProps) {
  const text = useTranslation().t

  const [userName, setUserName] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setUserName(userData?.name || "")
    setUserAvatar(userData?.avatar_url || "")
  }, [userData])

  function handleIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUserNameUpdate(name: string) {
    setUserName(name)
    handleIsUpdating(true)
  }

  function handleUserAvatarUpdate(name: string) {
    setUserAvatar(name)
    handleIsUpdating(true)
  }

  function handleUpdate() {
    const newData = {
      name: userName,
      avatar_url: userName,
    }
    handleUserUpdate(newData)
    handleIsUpdating(false)
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("edittemplate:back")}
          onClick={() => console.log("tab1")}
        />,
        <div key={2} className={`w-fit h-fit xl:hidden`}>
          <Tag
            variant="txt"
            text={text("edittemplate:update")}
            onClick={() => handleIsUpdating(false)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("profile:back")}
          onClick={() => console.log("tab1")}
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
        <Tag variant="img-txt" text={userName} img_url={userAvatar} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <ProfileContent
        handleUserNameUpdate={handleUserNameUpdate}
        handleUserAvatarUpdate={handleUserAvatarUpdate}
        handleUpdate={handleUpdate}
        isUpdating={isUpdating}
        name={userName}
        avatar={userAvatar}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
