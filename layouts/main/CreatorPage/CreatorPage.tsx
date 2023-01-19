import useTranslation from "next-translate/useTranslation";
import {
  ArrowsCounterClockwise,
  ArrowsLeftRight,
  GearSix,
  UserCircle,
} from "phosphor-react";
import { useEffect, useState } from "react";
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

  const {
    handleToggleContextMenu,
    handleUpdateContextMenu,
    handleCloseContextMenu,
  } = useContextMenu();

  const [isSwitchSelected, setIsSwitchSelected] = useState(false);

  useEffect(() => {
    console.log("useEffect", isSwitchSelected);
  }, [isSwitchSelected]);

  function handleSwitchClick(isSwitchSelected: boolean) {
    setIsSwitchSelected((prev) => !prev);
    handleUpdateContextMenu(handleContent(isSwitchSelected));
  }

  function loadWorkspaces() {
    return (
      <>
        <div className="w-fit">
          <Tag
            variant="img-txt"
            text="example"
            img_url="https://source.unsplash.com/featured/"
          />
        </div>
        <div className="w-fit">
          <Tag
            variant="img-txt"
            text="example"
            img_url="https://source.unsplash.com/featured/"
          />
        </div>
        <div className="w-fit">
          <Tag
            variant="img-txt"
            text="example"
            img_url="https://source.unsplash.com/featured/"
          />
        </div>
      </>
    );
  }

  const handleContent = (isSwitchSelected: boolean) => {
    console.log("aaaa", isSwitchSelected);

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
                variant="img"
                img_url="https://source.unsplash.com/featured/"
                onClick={handleCloseContextMenu}
              />
            </div>
            <div className="w-fit">
              <Tag
                variant="icn-txt"
                text={text("creatorpage:switch")}
                icon={ArrowsLeftRight}
                isSelected={isSwitchSelected}
                onClick={() => handleSwitchClick(isSwitchSelected)}
              />
            </div>
            <div className={`w-fit ${isSwitchSelected ? "hidden" : ""}`}>
              <Tag
                variant="icn-txt"
                text={text("creatorpage:settings")}
                icon={GearSix}
              />
            </div>
            <div className={`w-fit ${isSwitchSelected ? "hidden" : ""}`}>
              <Tag
                variant="icn-txt"
                text={text("creatorpage:profile")}
                icon={UserCircle}
              />
            </div>
            {isSwitchSelected && <>{loadWorkspaces()}</>}
          </div>
        </div>
      </div>
    );
  };

  const handleHeaderTagContextMenu = (isSwitchSelected: boolean) => {
    handleToggleContextMenu(handleContent(isSwitchSelected));
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

  function loadHeader(isSwitchSelected: boolean) {
    return (
      <Header
        reightContent={
          <Tag
            variant="img"
            img_url="https://source.unsplash.com/featured/"
            onClick={() => handleHeaderTagContextMenu(isSwitchSelected)}
          />
        }
        background_url={props.headerImageUrl}
      >
        {handleMainTag()}
      </Header>
    );
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {isSwitchSelected ? loadHeader(true) : loadHeader(false)}
      <CreatorPageContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  );
}
