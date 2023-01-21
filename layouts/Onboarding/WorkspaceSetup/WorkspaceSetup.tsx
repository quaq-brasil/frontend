import useTranslation from "next-translate/useTranslation"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { WorkspaceSetupContent } from "./WorkspaceSetupContent"

export default function WorkspaceSetup() {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("wssetup:tab1")}
        onClick={() => console.log("tab1")}
      />,
      <Tag
        key={2}
        variant="txt"
        text={text("wssetup:tab2")}
        onClick={() => console.log("tab2")}
      />,
    ]
  }

  function loadHeader() {
    return (
      <Header background_url="https://source.unsplash.com/featured/">
        <Tag variant="txt" text={text("wssetup:titletag")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <WorkspaceSetupContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
