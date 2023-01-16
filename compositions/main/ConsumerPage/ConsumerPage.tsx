import { Menu } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
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
  return (
    <>
      <Header
        reightContent={
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
                <Tag variant="txt" text={text("consumerpage:titletag")} />
              </Menu.Item>
              <Menu.Item>
                <Tag variant="txt" text={text("consumerpage:titletag")} />
              </Menu.Item>
              <Menu.Item>
                <Tag variant="txt" text={text("consumerpage:titletag")} />
              </Menu.Item>
              <Menu.Item>
                <Tag variant="txt" text={text("consumerpage:titletag")} />
              </Menu.Item>
            </div>
          </ContextMenu>
        }
        background_url={props.headerImageUrl}
      >
        <Tag variant="txt" text={text("consumerpage:titletag")} />
      </Header>
      <ConsumerPageContent />
      <TabBar
        isHidden={false}
        tags={[
          {
            variant: "txt",
            text: text("consumerpage:tab1a"),
            onClick: () => console.log("tab1"),
          },
          {
            variant: "txt",
            text: text("consumerpage:tab2"),
            onClick: () => console.log("tab2"),
          },
        ]}
      />
    </>
  );
}
