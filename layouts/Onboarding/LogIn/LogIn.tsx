import useTranslation from "next-translate/useTranslation";
import { Header } from "../../../components/Header/Header";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";
import { useContextMenu } from "../../../hooks/ContextMenuHook";
import { LogInContent } from "./LogInContent";

type LogInProps = {
  headerImageUrl: string;
};

export default function LogIn(props: LogInProps) {
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
        text={text("login:tab1")}
        onClick={() => console.log("tab1")}
      />,
      <Tag
        key={2}
        variant="txt"
        text={text("login:tab2")}
        onClick={() => console.log("tab2")}
      />,
    ];
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
        <Tag variant="txt" text={text("login:titletag")} />
      </Header>
      <LogInContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  );
}
