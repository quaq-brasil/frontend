import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { useEffect, useState } from "react"
import { BlockProps } from "../../../components/BlockReader/BlockReader"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"

type TextEntryConfigProps = {
  isOpen: boolean
  setIsOpen: () => void
  handleAddBlock: (block: BlockProps) => void
}

export function TextEntryConfig({
  handleAddBlock,
  isOpen,
  setIsOpen,
}: TextEntryConfigProps) {
  const text = useTranslation().t

  type ITextEntry = {
    description?: string
    placeholder?: string
    type?: string
  }

  const [content, setContent] = useState<ITextEntry>({ placeholder: "email" })
  const [saveas, setSaveas] = useState<string>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateConent(newData: ITextEntry) {
    setContent({
      placeholder: newData.placeholder || content?.placeholder,
      description: newData.description || content?.description,
      type: newData.type || content?.type,
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
      type: "textentry",
      savaAs: saveas,
      data: { content },
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
          text={text("textentryconfig:cancel")}
          onClick={() => handleClosing()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("textentryconfig:add")}
            onClick={() => onAddBlock()}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("textentryconfig:cancel")}
          onClick={() => handleClosing()}
        />,
      ]
    }
  }

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title={text("textentryconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("textentryconfig:description")} />
            <CardTextInput
              input={{
                label: text("textentryconfig:descriptionlabel"),
                onChange: (description) =>
                  handleUpdateConent({ description: description }),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => {},
              }}
            />
          </Card>
          <Card>
            <CardText label={text("textentryconfig:placeholder")} />
            <CardTextInput
              input={{
                label: text("textentryconfig:placeholderlabel"),
                onChange: (placeholder) =>
                  handleUpdateConent({ placeholder: placeholder }),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => {},
              }}
            />
          </Card>
          <Card>
            <CardText label={text("textentryconfig:type")} />
            <CardTextInput
              dropdown={{
                onChange: (type) => handleUpdateConent({ type: type }),
                options: [
                  text("textentryconfig:option1"),
                  text("textentryconfig:option2"),
                  text("textentryconfig:option3"),
                  text("textentryconfig:option4"),
                  text("textentryconfig:option5"),
                  text("textentryconfig:option6"),
                  text("textentryconfig:option7"),
                  text("textentryconfig:option8"),
                  text("textentryconfig:option9"),
                ],
              }}
            />
          </Card>
          <Card>
            <CardText label={text("textentryconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("textentryconfig:saveaslabel"),
                onChange: (value) => handleUpdateSaveas(value),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => {},
              }}
            />
          </Card>
          <div className="w-full h-fit hidden xl:block">
            <Button
              color="white"
              onClick={() => handleClosing()}
              text={text("textentryconfig:cancel")}
            />
          </div>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                color="white"
                onClick={() => handleUpdateRunUpdate(true)}
                text={text("textentryconfig:addblock")}
              />
            </div>
          )}
        </div>
        <TabBar isHidden={true} tags={handleTabBar()} />
      </Dialog>
    </>
  )
}
