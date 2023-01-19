import useTranslation from "next-translate/useTranslation";
import { UserCircle, UserCirclePlus, UserPlus } from "phosphor-react";
import { Header } from "../../../components/Header/Header";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";
import { useContextMenu } from "../../../hooks/ContextMenuHook";
import { ConsumerPageContent } from "./ConsumerPageContent";

type ConsumerPageProps = {
  headerImageUrl: string;
};

export default function ConsumerPage(props: ConsumerPageProps) {
  const text = useTranslation().t;

  const { handleToggleContextMenu, handleCloseContextMenu } = useContextMenu();

  const isSignedIn = false;

  const handleHeaderTagContextMenu = () => {
    const isSignedIn = false;

    const handleContent = () => {
      if (!isSignedIn) {
        return (
          <div
            className={`flex fixed z-10 top-0 left-0 right-0 bg-image
      justify-end min-h-[6.875rem] pb-[2rem] max-w-[1024px]
      lg:rounded-[2.5rem] mx-auto lg:min-h-[2.5rem] lg:px-10 
      lg:py-10 text-white lg:mt-[1.5rem] mt-[19px] md:mt-0"`}
          >
            <div className="pr-4 z-10 flex space-x-3">
              <div className="flex flex-col items-end gap-3">
                <div className="w-fit">
                  <Tag
                    variant="icn"
                    icon={UserCirclePlus}
                    onClick={handleCloseContextMenu}
                  />
                </div>
                <div className="w-fit">
                  <Tag
                    variant="icn-txt"
                    text={text("consumerpage:login")}
                    icon={UserCircle}
                  />
                </div>
                <div className="w-fit">
                  <Tag
                    variant="icn-txt"
                    text={text("consumerpage:signup")}
                    icon={UserPlus}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }
    };

    handleToggleContextMenu(handleContent());
  };

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

  function loadHeader() {
    if (isSignedIn) {
      return (
        <Header background_url={props.headerImageUrl}>{handleMainTag()}</Header>
      );
    } else {
      return (
        <Header
          reightContent={
            <Tag
              variant="icn"
              icon={UserCirclePlus}
              onClick={handleHeaderTagContextMenu}
            />
          }
          background_url={props.headerImageUrl}
        >
          {handleMainTag()}
        </Header>
      );
    }
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <ConsumerPageContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  );
}
