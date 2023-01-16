import useTranslation from "next-translate/useTranslation";
import { UserCirclePlus } from "phosphor-react";
import { Header } from "../../../parts/Header/Header";
import { TabBar } from "../../../parts/TabBar/TabBar";
import { Tag } from "../../../parts/Tag/Tag";
import { WorkspaceSetupContent } from "./WorkspaceSetupContent";

export default function WorkspaceSetup() {
  const text = useTranslation().t;
  return (
    <>
      <Header
        reightContent={<Tag variant="icn" icon={UserCirclePlus} />}
        background_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
      >
        <Tag variant="txt" text={text("workspacesetup:titletag")} />
      </Header>
      <WorkspaceSetupContent />
      <TabBar
        isHidden={false}
        tags={[
          {
            variant: "txt",
            text: text("workspacesetup:tab1a"),
            onClick: () => console.log("tab1"),
          },
          {
            variant: "txt",
            text: text("workspacesetup:tab2"),
            onClick: () => console.log("tab2"),
          },
        ]}
      />
    </>
  );
}
