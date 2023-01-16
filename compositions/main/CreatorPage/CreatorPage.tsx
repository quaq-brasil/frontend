import { Menu } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { ArrowsCounterClockwise } from "phosphor-react";
import { Header } from "../../../components/Header/Header";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";
import { CreatorPageContent } from "./CreatorPageContent";

type CreatorPageProps = {
  headerImageUrl: string;
};

const ContextMenu = dynamic(
  () => import("../../../components/ContextMenu/ContextMenu"),
  {
    ssr: false,
  }
);

export default function CreatorPage(props: CreatorPageProps) {
  const text = useTranslation().t;

  function handleContextMenu() {
    return (
      <ContextMenu
        Opener={
          <Tag variant="img" img_url="https://source.unsplash.com/featured/" />
        }
      >
        <div className="flex flex-col gap-3">
          <Menu.Item>
            <Tag variant="txt" text={text("example")} />
          </Menu.Item>
          <Menu.Item>
            <Tag variant="txt" text={text("example")} />
          </Menu.Item>
          <Menu.Item>
            <Tag variant="txt" text={text("example")} />
          </Menu.Item>
          <Menu.Item>
            <Tag variant="txt" text={text("example")} />
          </Menu.Item>
        </div>
      </ContextMenu>
    );
  }

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
        reightContent={handleContextMenu()}
        background_url={props.headerImageUrl}
      >
        {handleMainTag()}
      </Header>
      <CreatorPageContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  );
}
