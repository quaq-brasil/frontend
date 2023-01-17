import useTranslation from "next-translate/useTranslation";
import { Header } from "../../../components/Header/Header";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";
import { WorkspaceSetupContent } from "./WorkspaceSetupContent";

type WorkspaceSetupProps = {
  headerImageUrl: string;
};

export default function WorkspaceSetup(props: WorkspaceSetupProps) {
  const text = useTranslation().t;

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("wssetup:tab1")}
        onClick={() => console.log("tab1")}
      />,
      <Tag
        key={2}
        variant="txt"
        text={text("wssetup:tab2")}
        onClick={() => console.log("tab2")}
      />,
    ];
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      <Header background_url={props.headerImageUrl}>
        <Tag variant="txt" text={text("wssetup:titletag")} />
      </Header>
      <WorkspaceSetupContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  );
}
