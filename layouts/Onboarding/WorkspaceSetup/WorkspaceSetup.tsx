import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUser } from "../../../types/User.type"
import { WorkspaceSetupContent } from "./WorkspaceSetupContent"

type WorkspaceSetupProps = {
  handleCreateWorkspace: (name: string, avatar_url: string) => void
  data?: IUser | null
}

export default function WorkspaceSetup({
  handleCreateWorkspace,
  data,
}: WorkspaceSetupProps) {
  const text = useTranslation().t

  const [title, setTitle] = useState<string>("")
  const [cover, setCover] = useState<string>("")

  function handleTitleChange(value: string) {
    setTitle(value)
  }

  function handleCoverChange(value: string) {
    setCover(value)
  }

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("wssetup:tab2")}
        onClick={() => console.log("tab2")}
      />,
    ]
  }

  function loadHeader() {
    return (
      <Header
        background_url={
          cover != ""
            ? cover
            : "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag
          variant="img-txt"
          text={data?.name ? data.name : "username"}
          img_url={
            data?.avatar_url
              ? data.avatar_url
              : "https://source.unsplash.com/featured/"
          }
        />
        {title == "" && cover == "" && (
          <Tag variant="txt" text={text("wssetup:titletag")} />
        )}
        {title != "" && cover == "" && <Tag variant="txt" text={title} />}
        {title != "" && cover != "" && <Tag variant="txt" text={title} />}
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <WorkspaceSetupContent
        handleTitleChange={handleTitleChange}
        handleCoverChange={handleCoverChange}
        handleCreateWorkspace={handleCreateWorkspace}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
