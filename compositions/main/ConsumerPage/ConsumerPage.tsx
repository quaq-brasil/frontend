import { Menu } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { UserCirclePlus } from "phosphor-react";
import { Header } from "../../../components/Header/Header";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";
import { ConsumerPageContent } from "./ConsumerPageContent";

type ConsumerPageProps = {
  headerImageUrl: string;
};

const ContextMenu = dynamic(
  () => import("../../../components/ContextMenu/ContextMenu"),
  {
    ssr: false,
  }
);

export default function ConsumerPage(props: ConsumerPageProps) {
  const text = useTranslation().t;

  function handleContextMenu() {
    const isSignedIn = false;
    if (isSignedIn) {
      return (
        <ContextMenu
          Opener={
            <Tag
              variant="img"
              img_url="https://source.unsplash.com/featured/"
            />
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
    } else {
      return (
        <ContextMenu Opener={<Tag variant="icn" icon={UserCirclePlus} />}>
          <div className="flex flex-col gap-3">
            <Menu.Item>
              <Tag variant="txt" text={text("consumerpage:signup")} />
            </Menu.Item>
            <Menu.Item>
              <Tag variant="txt" text={text("consumerpage:login")} />
            </Menu.Item>
          </div>
        </ContextMenu>
      );
    }
  }

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("consumerpage:explore")}
        onClick={() => console.log("explore")}
      />,
      <Tag
        key={2}
        variant="txt"
        text={text("consumerpage:createpage")}
        onClick={() => console.log("createpage")}
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
    <>
      <Header
        reightContent={handleContextMenu()}
        background_url={props.headerImageUrl}
      >
        {handleMainTag()}
      </Header>
      <ConsumerPageContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </>
  );
}
