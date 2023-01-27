import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUpdatePage } from "../../../types/Page.type"
import { GeneralSettingsContent } from "./GeneralSettingsContent"

type GeneralSettingsProps = {
  pageData: IUpdatePage
  handleUpdatePage: (data: IUpdatePage) => void
}

export default function GeneralSettings({
  pageData,
  handleUpdatePage,
}: GeneralSettingsProps) {
  const text = useTranslation().t

  const [title, setTitle] = useState<string>("")
  const [avatar, setAvatar] = useState<string>("")
  const [cover, setCover] = useState<string>("")

  function handleUpdateTitle(title: string) {
    setTitle(title)
  }

  function handleUpdateAvatar(avatar: string) {
    setAvatar(avatar)
  }

  function handleUpdateCover(cover: string) {
    setCover(cover)
  }

  useEffect(() => {
    setTitle(pageData?.name || "")
    setAvatar(pageData?.avatar_url || "")
    setCover(pageData?.background_url || "")
  }, [pageData])

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("generalsettings:tab1")}
        onClick={() => console.log("tab1")}
      />,
    ]
  }

  function loadHeader() {
    return (
      <Header background_url={cover}>
        <Tag variant="img-txt" text={title} img_url={avatar} />
        <Tag variant="txt" text={text("generalsettings:titletag")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <GeneralSettingsContent
        initialData={pageData}
        handleUpdatePage={handleUpdatePage}
        handleUpdateAvatar={handleUpdateAvatar}
        handleUpdateTitle={handleUpdateTitle}
        handleUpdateCover={handleUpdateCover}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
