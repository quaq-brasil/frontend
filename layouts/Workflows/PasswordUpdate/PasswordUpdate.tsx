import useTranslation from "next-translate/useTranslation";
import { Header } from "../../../components/Header/Header";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";
import { PasswordUpdateContent } from "./PasswordUpdateContent";

type PasswordUpdateProps = {
  headerImageUrl: string;
};

export default function PasswordUpdate(props: PasswordUpdateProps) {
  const text = useTranslation().t;

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("pwupdate:tab1")}
        onClick={() => console.log("tab1")}
      />,
    ];
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      <Header background_url={props.headerImageUrl}>
        <Tag
          variant="img-txt"
          text="username"
          img_url="https://source.unsplash.com/featured/"
        />
        <Tag variant="txt" text={text("pwupdate:titletag")} />
      </Header>
      <PasswordUpdateContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  );
}
