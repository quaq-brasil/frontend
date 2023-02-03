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
    placeholder?: string
    type?: string
  }

  const [content, setContent] = useState<ITextEntry>({ type: "email" })
  const [saveas, setSaveas] = useState<string>()
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateConent(newData: ITextEntry) {
    setContent({
      placeholder: newData.placeholder || content?.placeholder,
      type: newData.type || content?.type,
    })
  }

  function handleUpdateSaveas(value: string) {
    setSaveas(value)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleClosing() {
    handleUpdateConent({})
    setSaveas(undefined)
    handleUpdateRunUpdate(false)
    setIsOpen()
    setContent({ type: "email" })
  }

  function onAddBlock() {
    handleAddBlock({
      type: "textentry",
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
                  {
                    title: text("textentryconfig:option1"),
                    value: "email",
                  },
                  {
                    title: text("textentryconfig:option3"),
                    value: "number",
                  },
                  {
                    title: text("textentryconfig:option5"),
                    value: "url",
                  },
                  {
                    title: text("textentryconfig:option8"),
                    value: "long-text",
                  },
                  {
                    title: text("textentryconfig:option9"),
                    value: "text",
                  },
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
              block={{
                data: {
                  color: "bg-white",
                  text: text("textentryconfig:cancel"),
                  onClick: () => handleClosing(),
                },
              }}
              isEditable={false}
            />
          </div>
          <div className="w-full h-fit hidden xl:block">
            <Button
              block={{
                data: {
                  color: "bg-white",
                  text: text("textentryconfig:addblock"),
                  onClick: () => handleUpdateRunUpdate(true),
                },
              }}
              isEditable={false}
            />
          </div>
        </div>
        <TabBar isHidden={true} tags={handleTabBar()} />
      </Dialog>
    </>
  )
}
