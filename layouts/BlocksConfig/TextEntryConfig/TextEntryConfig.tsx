import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { useEffect, useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { BlocksConfigProps } from "../../../types/BlockConfig.types"

export function TextEntryConfig({
  handleAddBlock,
  isOpen,
  onClose,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type ITextEntry = {
    placeholder?: string
    type?: string
  }

  const [content, setContent] = useState<ITextEntry>({
    type: "email",
    placeholder: "",
  })
  const [saveas, setSaveas] = useState<string>()
  const [runUpdate, setRunUpdate] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  function handleUpdateContent(newData: ITextEntry) {
    setContent((state) => {
      return {
        ...state,
        ...newData,
      } as ITextEntry
    })
    setIsUpdating(true)
  }

  function handleUpdateSaveas(value: string) {
    setSaveas(value)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleClosing() {
    handleUpdateContent({})
    setSaveas(undefined)
    handleUpdateRunUpdate(false)
    onClose()
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

  const handleOpenVariablePanelForPlaceholder = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({ placeholder: variable })
      })
    handleOpenVariablePanel()
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
                inputValue: content.placeholder,
                onChange: (placeholder) =>
                  handleUpdateContent({ placeholder: placeholder }),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForPlaceholder,
              }}
            />
          </Card>
          <Card>
            <CardText label={text("textentryconfig:type")} />
            <CardTextInput
              dropdown={{
                onChange: (type) => handleUpdateContent({ type: type }),
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
                onClick: handleOpenVariablePanel,
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
          {isUpdating && (
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
          )}
        </div>
        <TabBar isHidden={true} tags={handleTabBar()} />
      </Dialog>
    </>
  )
}
