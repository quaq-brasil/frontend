import useTranslation from "next-translate/useTranslation"
import { Dialog } from "../../../components/Dialog/Dialog"
import { Shortcut } from "../../../components/Shortcut/Shortcut"
import { ShortcutGrid } from "../../../components/ShortcutGrid/ShortcutGrid"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"

type CreationsConfigTemplatesProps = {
  isOpen: boolean
  setIsOpen: () => void
  size?: "sm" | "md" | "full"
}

export function CreationsConfigTemplates(props: CreationsConfigTemplatesProps) {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("creationsconfig:back")}
        onClick={() => props.setIsOpen()}
      />,
    ]
  }

  function loadTemplates() {
    return [
      <Shortcut
        key={1}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 1"
        index={0}
        id={""}
        templateData={{} as any}
        pageData={undefined}
      />,
      <Shortcut
        key={2}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 2"
        index={0}
        id={""}
        templateData={{} as any}
        pageData={undefined}
      />,
      <Shortcut
        key={3}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 3"
        index={0}
        id={""}
        templateData={{} as any}
        pageData={undefined}
      />,
      <Shortcut
        key={4}
        img_url="https://source.unsplash.com/featured/"
        size="large"
        title="template 4"
        index={0}
        id={""}
        templateData={{} as any}
        pageData={undefined}
      />,
      <Shortcut
        key={5}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 5"
        index={0}
        id={""}
        templateData={{} as any}
        pageData={undefined}
      />,
      <Shortcut
        key={6}
        img_url="https://source.unsplash.com/featured/"
        size="large"
        title="template 6"
        index={0}
        id={""}
        templateData={{} as any}
        pageData={undefined}
      />,
    ]
  }

  return (
    <>
      <Dialog height={props.size} isOpen={props.isOpen} title={"Page Title"}>
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <div className="fixed w-full h-min-[100%] px-2">
            <ShortcutGrid>{loadTemplates()}</ShortcutGrid>
          </div>
        </div>
        <TabBar
          isHidden={props.size === "sm" ? true : false}
          tags={handleTabBar()}
        />
      </Dialog>
    </>
  )
}
