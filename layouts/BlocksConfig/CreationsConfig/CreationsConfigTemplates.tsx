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
      />,
      <Shortcut
        key={2}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 2"
      />,
      <Shortcut
        key={3}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 3"
      />,
      <Shortcut
        key={4}
        img_url="https://source.unsplash.com/featured/"
        size="large"
        title="template 4"
      />,
      <Shortcut
        key={5}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 5"
      />,
      <Shortcut
        key={6}
        img_url="https://source.unsplash.com/featured/"
        size="large"
        title="template 6"
      />,
    ]
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={"Page Title"}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <div className="fixed w-full h-min-[100%] px-2">
            <ShortcutGrid onDrag={(e) => console.log(e)}>
              {loadTemplates()}
            </ShortcutGrid>
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