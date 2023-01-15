import useTranslation from "next-translate/useTranslation";
import { UserCirclePlus } from "phosphor-react";
import { Header } from "../../../parts/Header/Header";
import { TabBar } from "../../../parts/TabBar/TabBar";
import { Tag } from "../../../parts/Tag/Tag";
import { SignUpContent } from "./SignUpContent";

type SignUpProps = {
  headerImageUrl: string;
};

export default function SignUp(props: SignUpProps) {
  const text = useTranslation().t;
  return (
    <>
      <Header
        reightContent={<Tag variant="icn" icon={UserCirclePlus} />}
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
