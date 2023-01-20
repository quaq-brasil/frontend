import useTranslation from "next-translate/useTranslation"
import {
  ArrowsCounterClockwise,
  ArrowsLeftRight,
  GearSix,
  MagnifyingGlass,
  Plus,
  UserCircle,
} from "phosphor-react"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { useContextMenu } from "../../../hooks/ContextMenuHook"
import { CreatorPageContent } from "./CreatorPageContent"

type CreatorPageProps = {
  headerImageUrl: string
}

export default function CreatorPage(props: CreatorPageProps) {
  const text = useTranslation().t

  const {
    handleToggleContextMenu,
    handleUpdateContextMenu,
    handleCloseContextMenu,
  } = useContextMenu()

  const [isSwitchSelected, setIsSwitchSelected] = useState(false)

  const [contextMenuSwitch, setContextMenuSwitch] = useState<string | null>(
    null
  )

  const workspaceContextMenuContent = (
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
              onClick={() => handleSwitchClick()}
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
  )

  const tabbarContextMenuContent = (
    <div className="fixed w-full px-[16px] flex flex-row justify-between left-0 right-0 bottom-[16px]">
      <div className="flex flex-col gap-3">
        <div className="w-fit">
          <Tag variant="txt" text={text("creatorpage:pages")} />
        </div>
        <div className="w-fit">
          <Tag
            variant="img-txt"
            text="page example"
            img_url="https://source.unsplash.com/featured/"
            isSelected
          />
        </div>
        <div className="w-fit">
          <Tag
            variant="img-txt"
            text="page example"
            img_url="https://source.unsplash.com/featured/"
          />
        </div>
        <div className="w-fit">
          <Tag
            variant="img-txt"
            text="page example"
            img_url="https://source.unsplash.com/featured/"
          />
        </div>
        <div className="w-fit">
          <Tag
            variant="icn-txt"
            text={text("creatorpage:newpage")}
            icon={Plus}
          />
        </div>
      </div>
      <div className="flex flex-col justify-end items-end gap-3">
        <div className="w-fit">
          <Tag
            variant="icn-txt"
            text={text("creatorpage:explore")}
            icon={MagnifyingGlass}
          />
        </div>
        <div className="w-fit">
          <Tag
            variant="icn"
            icon={ArrowsCounterClockwise}
            onClick={handleCloseContextMenu}
          />
        </div>
      </div>
    </div>
  )

  const lateralMenuContent = (
    <div>
      <div className="w-fit">
        <Tag variant="txt" text={text("creatorpage:explore")} />
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <div className="w-fit">
          <Tag variant="txt" text={text("creatorpage:pages")} isSeparated />
        </div>
        <div className="w-fit">
          <Tag
            variant="img-txt"
            text="page example"
            img_url="https://source.unsplash.com/featured/"
            isSelected
          />
        </div>
        <div className="w-fit">
          <Tag
            variant="img-txt"
            text="page example"
            img_url="https://source.unsplash.com/featured/"
          />
        </div>
        <div className="w-fit">
          <Tag
            variant="img-txt"
            text="page example"
            img_url="https://source.unsplash.com/featured/"
          />
        </div>
        <div className="w-fit">
          <Tag
            variant="icn-txt"
            text={text("creatorpage:newpage")}
            icon={Plus}
          />
        </div>
      </div>
    </div>
  )

  useEffect(() => {
    if (contextMenuSwitch === "workspace") {
      handleUpdateContextMenu(workspaceContextMenuContent)
    } else if (contextMenuSwitch === "tabbar") {
      handleUpdateContextMenu(tabbarContextMenuContent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSwitchSelected])

  function handleSwitchClick() {
    setIsSwitchSelected((prev) => !prev)
    handleUpdateContextMenu(workspaceContextMenuContent)
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
        <div className={`w-fit`}>
          <Tag
            variant="icn-txt"
            text={text("creatorpage:newworkspace")}
            icon={Plus}
          />
        </div>
      </>
    )
  }

  const handleHeaderTagContextMenu = () => {
    setContextMenuSwitch("workspace")
    handleToggleContextMenu(workspaceContextMenuContent)
  }

  const handleTabBarContextMenu = () => {
    setContextMenuSwitch("tabbar")
    handleToggleContextMenu(tabbarContextMenuContent)
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
      <div key={3} className="xl:hidden w-fit">
        <Tag
          variant="icn"
          icon={ArrowsCounterClockwise}
          onClick={() => handleTabBarContextMenu()}
        />
      </div>,
      <div key={4} className="hidden xl:block">
        {lateralMenuContent}
      </div>,
    ]
  }

  function handleMainTag() {
    return (
      <Tag
        variant="img-txt"
        text="example"
        img_url="https://source.unsplash.com/featured/"
      />
    )
  }

  function loadHeader() {
    return (
      <Header
        reightContent={
          <Tag
            variant="img"
            img_url="https://source.unsplash.com/featured/"
            onClick={() => handleHeaderTagContextMenu()}
          />
        }
        background_url={props.headerImageUrl}
      >
        {handleMainTag()}
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CreatorPageContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}