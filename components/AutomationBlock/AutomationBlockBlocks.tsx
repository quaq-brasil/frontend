import { BlockSelector } from "components/BlockSelector/BlockSelector"
import { Dialog } from "components/Dialog/Dialog"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { memo, useMemo } from "react"

type AutomationBlockBlocksProps = {
  isOpen: boolean
  setIsOpen: () => void
  size?: "sm" | "md" | "full"
}

export const AutomationBlockBlocks = memo(function AutomationBlockBlocks(
  props: AutomationBlockBlocksProps
) {
  const text = useTranslation().t

  const tabBarTags = useMemo(() => {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("automationblock:back")}
        onClick={() => props.setIsOpen()}
      />,
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.setIsOpen, text])

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("automationblock:toptitle")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <BlockSelector />
          <TabBar
            isHidden={props.size === "sm" ? true : false}
            tags={tabBarTags}
          />
        </div>
      </Dialog>
    </>
  )
})
