import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { useEffect, useState } from "react"
import { BlockProps } from "../../../components/BlockReader/BlockReader"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardColorSelector } from "../../../components/Card/CardContentVariants/CardColorSelector"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"

type ButtonConfigProps = {
  isOpen: boolean
  setIsOpen: () => void
  handleAddBlock: (block: BlockProps) => void
}

export function ButtonConfig({
  isOpen,
  setIsOpen,
  handleAddBlock,
}: ButtonConfigProps) {
  const text = useTranslation().t

  type IButton = {
    text?: string
    color?: string
  }

  const [content, setContent] = useState<IButton>()
  const [saveas, setSaveas] = useState<string>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateConent(newData: IButton) {
    setContent({
      text: newData.text || content?.text,
      color: newData.color || content?.color,
    })
    handleUpdateIsUpdating(true)
  }

  function handleUpdateSaveas(value: string) {
    setSaveas(value)
    handleUpdateIsUpdating(true)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleClosing() {
    handleUpdateConent({})
    setSaveas(undefined)
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    setIsOpen()
  }

  function onAddBlock() {
    handleAddBlock({
      type: "button",
      saveAs: saveas,
      data: content,
    })
    handleClosing()
  }

  useEffect(() => {
    if (content && saveas) {
      onAddBlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("reviewconfig:cancel")}
          onClick={() => handleClosing()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("reviewconfig:add")}
            onClick={() => onAddBlock()}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("reviewconfig:cancel")}
          onClick={() => handleClosing()}
        />,
      ]
    }
  }

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title={text("buttonconfig:toptitle")}
        onClose={() => {}}
      >
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("buttonconfig:text")} />
            <CardTextInput
              input={{
                label: text("buttonconfig:textlabel"),
                onChange: (text) => handleUpdateConent({ text: text }),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => {},
              }}
            />
            <CardText label={text("buttonconfig:color")} />
            <CardColorSelector
              onColorSelection={(color) => console.log(color)}
            />
          </Card>
          <Card>
            <CardText label={text("buttonconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("buttonconfig:saveaslabel"),
                onChange: (e) => handleUpdateSaveas(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => {},
              }}
            />
          </Card>
          <div className="w-full h-fit hidden xl:block">
            <Button
              block={{
                data: {
                  color: "bg-white",
                  text: text("buttonconfig:cancel"),
                  onClick: handleClosing,
                },
              }}
              isEditable={false}
            />
          </div>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                block={{
                  data: {
                    color: "bg-white",
                    text: text("buttonconfig:addblock"),
                    onClick: () => handleUpdateRunUpdate(true),
                  },
                }}
                isEditable={false}
              />
            </div>
          )}
          <TabBar isHidden={true} tags={handleTabBar()} />
        </div>
      </Dialog>
    </>
  )
}
