import useTranslation from "next-translate/useTranslation";
import { Header } from "../../../components/Header/Header";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";
import { TemplateAccessControlContent } from "./TemplateAccessControlContent";

export default function TemplateAccessControl() {
  const text = useTranslation().t;

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("accesscontrol:tab1")}
        onClick={() => console.log("tab1")}
      />,
    ];
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
      <TemplateAccessControlContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  );
}
