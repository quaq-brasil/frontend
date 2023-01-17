import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { Header } from "../../../components/Header/Header";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";
import { PasswordRecoveryContent } from "./PasswordRecoveryContent";

type PasswordRecoveryProps = {
  headerImageUrl: string;
};

const ContextMenu = dynamic(
  () => import("../../../components/ContextMenu/ContextMenu"),
  {
    ssr: false,
  }
);

export default function PasswordRecovery(props: PasswordRecoveryProps) {
  const text = useTranslation().t;

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("pwrecovery:tab1")}
        onClick={() => console.log("tab1")}
      />,
    ];
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      <Header background_url={props.headerImageUrl}>
        <Tag variant="txt" text={text("pwrecovery:titletag")} />
      </Header>
      <PasswordRecoveryContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  );
}
