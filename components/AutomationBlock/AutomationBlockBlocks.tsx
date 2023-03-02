import useTranslation from "next-translate/useTranslation"
import { BlockSelector } from "../BlockSelector/BlockSelector"
import { Dialog } from "../Dialog/Dialog"
import { TabBar } from "../TabBar/TabBar"
import { Tag } from "../Tag/Tag"

type AutomationBlockBlocksProps = {
  isOpen: boolean
  setIsOpen: () => void
  size?: "sm" | "md" | "full"
}

export function AutomationBlockBlocks(props: AutomationBlockBlocksProps) {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("automationblock:back")}
        onClick={() => props.setIsOpen()}
      />,
    ]
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("automationblock:toptitle")}
        onClose={() => {}}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <BlockSelector onBlockSelect={() => {}} />
          <TabBar
            isHidden={props.size === "sm" ? true : false}
            tags={handleTabBar()}
          />
        </div>
      </Dialog>
    </>
  )
}
