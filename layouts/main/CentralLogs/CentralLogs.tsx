import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { CentralLogsContent } from "./CentralLogsContent"

export default function CentralLogs() {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag key={1} variant="txt" text={text("centrallogs:back")} />,
      <Tag key={2} variant="txt" text={text("centrallogs:options")} />,
      <Tag key={3} variant="txt" text={text("centrallogs:logs")} isSelected />,
      <Tag key={4} variant="txt" text={text("centrallogs:stats")} />,
    ]
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
          text="page title"
          img_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        />
        <Tag
          variant="img-txt"
          text="template title"
          img_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CentralLogsContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
