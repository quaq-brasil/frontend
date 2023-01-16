import { Menu } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";
import { UserCirclePlus } from "phosphor-react";
import { ContextMenu } from "../../../components/ContextMenu/ContextMenu";
import { Header } from "../../../components/Header/Header";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";
import { SignUpContent } from "./SignUpContent";

type SignUpProps = {
  headerImageUrl: string;
};

export default function SignUp(props: SignUpProps) {
  const text = useTranslation().t;
  return (
    <>
      <Header
        reightContent={
          <ContextMenu Opener={<Tag variant="icn" icon={UserCirclePlus} />}>
            <Menu.Item>
              <>
                <Tag variant="txt" text={text("signup:titletag")} />
              </>
            </Menu.Item>
          </ContextMenu>
        }
        background_url={props.headerImageUrl}
      >
        <Tag variant="txt" text={text("signup:titletag")} />
      </Header>
      <SignUpContent />
      <TabBar
        isHidden={false}
        tags={[
          {
            variant: "txt",
            text: text("signup:tab1a"),
            onClick: () => console.log("tab1"),
          },
          {
            variant: "txt",
            text: text("signup:tab2"),
            onClick: () => console.log("tab2"),
          },
        ]}
      />
    </>
  );
}
