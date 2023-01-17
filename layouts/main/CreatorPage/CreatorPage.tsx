import useTranslation from "next-translate/useTranslation";
import { ArrowsCounterClockwise } from "phosphor-react";
import { Header } from "../../../components/Header/Header";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";
import { useContextMenu } from "../../../hooks/ContextMenuHook";
import { CreatorPageContent } from "./CreatorPageContent";

type CreatorPageProps = {
  headerImageUrl: string;
};

export default function CreatorPage(props: CreatorPageProps) {
  const text = useTranslation().t;

  const { handleToggleContextMenu } = useContextMenu();

  const handleHeaderTagContextMenu = () => {
    const isSignedIn = false;

    const handleContent = () => {
      if (isSignedIn) {
        return (
          <div className="flex flex-col gap-3">
            <Tag variant="txt" text={text("example")} />
            <Tag variant="txt" text={text("example")} />
            <Tag variant="txt" text={text("example")} />
            <Tag variant="txt" text={text("example")} />
          </div>
        );
      }

      return (
        <div>
          <Tag variant="txt" text={text("consumerpage:signup")} />
          <Tag variant="txt" text={text("consumerpage:login")} />
        </div>
      );
    };

    handleToggleContextMenu(handleContent());
  };

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("creatorpage:general")}
        onClick={() => console.log("general")}
      />,
      <Tag
        key={2}
        variant="txt"
        text={text("creatorpage:new")}
        onClick={() => console.log("new")}
      />,
      <Tag
        key={3}
        variant="icn"
        icon={ArrowsCounterClockwise}
        onClick={() => console.log("switch")}
      />,
    ];
  }

  function handleMainTag() {
    return (
      <Tag
        variant="img-txt"
        text="example"
        img_url="https://source.unsplash.com/featured/"
      />
    );
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      <Header
        reightContent={
          <Tag
            variant="img"
            img_url="https://source.unsplash.com/featured/"
            onClick={handleHeaderTagContextMenu}
          />
        }
        background_url={props.headerImageUrl}
      >
        {handleMainTag()}
      </Header>
      <CreatorPageContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  );
}
