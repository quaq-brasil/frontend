import useTranslation from "next-translate/useTranslation"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { FirsWorkspaceContent } from "./FirstWorkspaceContent"

export default function FirstWorkspace() {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("wssettings:tab1")}
        onClick={() => console.log("tab1")}
      />,
    ]
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      <Header
        background_url={
          "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag
          variant="img-txt"
          text={text("wssettings:titletag")}
          img_url="https://source.unsplash.com/featured/"
        />
      </Header>
      <FirsWorkspaceContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
