import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUser } from "../../../types/User.type"
import { ProfileAdvancedContent } from "./ProfileAdvancedContent"

type ProfileAdvancedProps = {
  userData: IUser
}

export default function ProfileAdvanced({ userData }: ProfileAdvancedProps) {
  const text = useTranslation().t

  const [userName, setUserName] = useState("")
  const [userAvatar, setUserAvatar] = useState("")

  useEffect(() => {
    setUserName(userData?.name || "")
    setUserAvatar(userData?.avatar_url || "")
  }, [userData])

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("profileadvanced:tab1")}
        onClick={() => console.log("tab1")}
      />,
    ]
  }

  function handleHeader() {
    return (
      <Header
        background_url={
          "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag variant="img-txt" text={userName} img_url={userAvatar} />
        <Tag variant="txt" text={text("profileadvanced:titletag")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      <>{handleHeader()}</>
      <ProfileAdvancedContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
