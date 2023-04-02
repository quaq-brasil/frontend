import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState } from "react"
import { IUpdateUser } from "types/User.type"
import { SignUserUpContent } from "./SignUserUpContent"

type SignUserUpProps = {
  handleCreateUser: (data: IUpdateUser) => void
}

export function SignUserUp({ handleCreateUser }: SignUserUpProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

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
      <SignUserUpContent
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        isUpdating={isUpdating}
        runUpdate={runUpdate}
        handleCreateUser={handleCreateUser}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
