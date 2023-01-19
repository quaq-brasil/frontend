import useTranslation from "next-translate/useTranslation";
import { Header } from "../../../components/Header/Header";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";
import { EditTemplateContent } from "./EditTemplateContent";

export default function EditTemplate() {
  const text = useTranslation().t;

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("edittemplate:tab1")}
        onClick={() => console.log("tab1")}
      />,
    ];
  }

  function loadHeader() {
    return (
      <Header background_url={"https://source.unsplash.com/featured/"}>
        <Tag
          variant="img-txt"
          text="page title"
          img_url="https://source.unsplash.com/featured/"
        />
        <Tag
          variant="img-txt"
          text="template title"
          img_url="https://source.unsplash.com/featured/"
        />
      </Header>
    );
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <EditTemplateContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  );
}
