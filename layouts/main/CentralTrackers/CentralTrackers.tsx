import useTranslation from "next-translate/useTranslation"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { CentralTrackersContent } from "./CentralTrackersContent"

type IData = {
  name: string
  avatar_url?: string
  background_url?: string
  shortcut_image?: string
}

type CentralTrackersProps = {
  handleUpdateTrackers: (face?: string, google?: string) => void
  pageData?: IData
  templateData?: IData
}

export default function CentralTrackers({
  handleUpdateTrackers,
  pageData,
  templateData,
}: CentralTrackersProps) {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("centraltrackers:back")}
        onClick={() => console.log()}
      />,
    ]
  }

  function loadHeader() {
    return (
      <Header
        background_url={
          pageData?.background_url
            ? pageData.background_url
            : "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag
          variant="img-txt"
          text={pageData?.name ? pageData.name : "page title"}
          img_url={
            pageData?.avatar_url
              ? pageData.avatar_url
              : "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
          }
        />
        <Tag
          variant="img-txt"
          text={templateData?.name ? templateData.name : "page title"}
          img_url={
            templateData?.shortcut_image
              ? templateData.shortcut_image
              : "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
          }
        />
        <Tag variant="txt" text={text("centraltrackers:trackers")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CentralTrackersContent handleUpdateTrackers={handleUpdateTrackers} />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
