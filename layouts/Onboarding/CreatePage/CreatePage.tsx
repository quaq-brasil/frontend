import useTranslation from "next-translate/useTranslation"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { CreatePageContent } from "./CreatePageContent"

export default function CreatePage() {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("createpage:next")}
        onClick={() => console.log("next")}
      />,
    ]
  }

  function loadHeader() {
    return (
      <Header background_url="https://source.unsplash.com/featured/">
        <Tag
          variant="img-txt"
          text="workspace title"
          img_url="https://source.unsplash.com/featured/"
        />
        <Tag variant="txt" text={text("createpage:titletag")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CreatePageContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
