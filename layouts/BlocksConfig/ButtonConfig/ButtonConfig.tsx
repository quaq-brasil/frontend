import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { useEffect, useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardColorSelector } from "../../../components/Card/CardContentVariants/CardColorSelector"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { BlocksConfigProps } from "../../../types/BlockConfig.types"

export function ButtonConfig({
  isOpen,
  onClose,
  handleAddBlock,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type IButton = {
    text?: string
    color?: string
  }

  const [content, setContent] = useState<IButton>()
  const [saveAs, setSaveAs] = useState<string>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateContent(newData: IButton) {
    setContent((state) => {
      return {
        ...state,
        ...newData,
      } as IButton
    })
    setIsUpdating(true)
  }

  function handleUpdateSaveAs(value: string) {
    setSaveAs(value)
    handleUpdateIsUpdating(true)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleClosing() {
    handleUpdateContent({})
    setSaveAs(undefined)
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      type: "button",
      save_as: saveAs,
      data: content,
    })
    handleClosing()
  }

  useEffect(() => {
    if (content && saveAs) {
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

  const handleOpenVariablePanelForText = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({ text: `${content?.text}${variable}` })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForSaveAs = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateSaveAs(`${saveAs}${variable}`)
      })
    handleOpenVariablePanel()
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
                onChange: (text) => handleUpdateContent({ text: text }),
                inputValue: content?.text,
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForText,
              }}
            />
            <CardText label={text("buttonconfig:color")} />
            <CardColorSelector
              onColorSelection={(color) =>
                handleUpdateContent({ color: color })
              }
            />
          </Card>
          <Card>
            <CardText label={text("buttonconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("buttonconfig:saveaslabel"),
                onChange: (e) => handleUpdateSaveAs(e),
                inputValue: saveAs,
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForSaveAs,
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
