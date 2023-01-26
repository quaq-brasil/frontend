import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { CreatePageContent } from "./CreatePageContent"

type IData = {
  name: string
  avatar_url: string
}

type CreatePageProps = {
  data?: IData
  handleCreatePage: (
    name: string,
    url: string,
    workspace_id: string,
    avatar_url: string,
    background_url: string
  ) => void
}

export function CreatePage({ data, handleCreatePage }: CreatePageProps) {
  const text = useTranslation().t

  const [pageTitle, setPageTitle] = useState<string>("")
  const [pagePitcure, setPagePicture] = useState<string>("")
  const [pageCover, setPageCover] = useState<string>("")

  function handleChangePageTitle(title: string) {
    setPageTitle(title)
  }

  function handleChangePagePicture(url: string) {
    setPagePicture(url)
  }

  function handleChangePageCover(url: string) {
    setPageCover(url)
  }

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("createpage:back")}
        onClick={() => console.log("back")}
      />,
    ]
  }

  function loadHeader() {
    return (
      <Header
        background_url={
          pageCover != ""
            ? pageCover
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
        {pageTitle == "" && pagePitcure == "" && (
          <Tag variant="txt" text={text("createpage:titletag")} />
        )}
        {pageTitle != "" && pagePitcure == "" && (
          <Tag variant="txt" text={pageTitle} />
        )}
        {pageTitle != "" && pagePitcure != "" && (
          <Tag variant="img-txt" text={pageTitle} img_url={pagePitcure} />
        )}
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CreatePageContent
        handleCreatePage={handleCreatePage}
        handleChangePageTitle={handleChangePageTitle}
        handleChangePagePicture={handleChangePagePicture}
        handleChangePageCover={handleChangePageCover}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
