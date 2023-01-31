import useTranslation from "next-translate/useTranslation"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IPage } from "../../../types/Page.type"
import { CreateTemplateContent } from "./CreateTemplateContent"

type CreateTemplateProps = {
  page: IPage | undefined
}

export default function CreateTemplate({ page }: CreateTemplateProps) {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("createtemplate:back")}
        onClick={() => console.log("back")}
      />,
    ]
  }

  function loadHeader() {
    return (
      <Header
        background_url={
          page?.background_url ||
          "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag
          variant="img-txt"
          text={page?.name || ""}
          img_url={page?.avatar_url || "https://source.unsplash.com/featured/"}
        />
        <Tag variant="txt" text={text("createtemplate:newtemplate")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CreateTemplateContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
