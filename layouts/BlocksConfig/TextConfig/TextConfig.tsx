import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { BlockProps } from "../../../components/BlockReader/BlockReader"
import { Button } from "../../../components/Button/Button"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import TextEditor from "../../../components/TextEditor/TextEditor"

type TextConfigProps = {
  isOpen: boolean
  setIsOpen: () => void
  size?: "sm" | "md" | "full"
  handleAddBlock: (block: BlockProps) => void
}

export function TextConfig({
  handleAddBlock,
  isOpen,
  setIsOpen,
  size,
}: TextConfigProps) {
  const text = useTranslation().t

  const [content, setContent] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateContent(content: string) {
    setContent(content)
    handleUpdateIsUpdating(true)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleClosing() {
    handleUpdateContent("")
    handleUpdateIsUpdating(false)
    handleUpdateRunUpdate(false)
    setIsOpen()
  }

  function onAddBlock() {
    handleAddBlock({
      type: "text",
      data: content,
    })
  }

  useEffect(() => {
    if (content.length > 1) {
      onAddBlock()
      handleClosing()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("textconfig:cancel")}
          onClick={handleClosing}
        />,
        <div key={2}>
          <Tag
            variant="txt"
            text={text("textconfig:add")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("textconfig:cancel")}
          onClick={() => setIsOpen()}
        />,
      ]
    }
  }

  return (
    <>
      <Dialog
        height={size}
        isOpen={isOpen}
        title={text("textconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="flex flex-col justify-center gap-[0.375rem] h-fit py-[16px]
    bg-white min-w-[100%] rounded-[20px] lg:rounded-[30px] lg:gap-[0.75rem]"
          >
            <TextEditor content={content} onChange={handleUpdateContent} />
            <CardLine />
          </div>
          {isUpdating && (
            <>
              <div className="w-full h-fit hidden xl:block">
                <Button
                  color="white"
                  text={text("textconfig:addblock")}
                  onClick={() => handleUpdateRunUpdate(true)}
                />
              </div>
            </>
          )}
          <div className="w-full h-fit hidden xl:block">
            <Button
              color="white"
              text={text("textconfig:cancel")}
              onClick={handleClosing}
            />
          </div>
        </div>
        <TabBar isHidden={true} tags={handleTabBar()} />
      </Dialog>
    </>
  )
}
