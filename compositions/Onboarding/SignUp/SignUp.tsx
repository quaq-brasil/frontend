import { Menu } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { UserCirclePlus } from "phosphor-react";
import { Header } from "../../../components/Header/Header";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";
import { SignUpContent } from "./SignUpContent";

type SignUpProps = {
  headerImageUrl: string;
};

const ContextMenu = dynamic(
  () => import("../../../components/ContextMenu/ContextMenu"),
  {
    ssr: false,
  }
);

export default function SignUp(props: SignUpProps) {
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
        text={text("signup:tab1a")}
        onClick={() => console.log("tab1a")}
      />,
      <Tag
        key={2}
        variant="txt"
        text={text("signup:tab2")}
        onClick={() => console.log("tab2")}
      />,
    ];
  }

  return (
    <>
      <Header
        reightContent={handleContextMenu()}
        background_url={props.headerImageUrl}
      >
        <Tag variant="txt" text={text("signup:titletag")} />
      </Header>
      <SignUpContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </>
  );
}
