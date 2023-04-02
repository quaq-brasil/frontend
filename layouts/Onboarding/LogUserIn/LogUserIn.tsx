import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState } from "react"
import { pageUrls } from "utils/pagesUrl"
import { LogUserInContent } from "./LogUserInContent"

export function LogUserIn() {
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
      <LogUserInContent
        isUpdating={isUpdating}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        runUpdate={runUpdate}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
