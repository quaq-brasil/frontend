import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { PasswordRecoveryContent } from "./PasswordRecoveryContent"

export function PasswordRecovery() {
  const text = useTranslation().t
  const router = useRouter()

  function handleTabBar() {
    return [<Tag key={1} variant="txt" text={text("pwrecovery:tab1")} />]
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      <Header background_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80">
        <Tag variant="txt" text={text("pwrecovery:titletag")} />
      </Header>
      <PasswordRecoveryContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
