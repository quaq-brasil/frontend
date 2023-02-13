import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { useEffect, useState } from "react"
import { v4 } from "uuid"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import TextEditor from "../../../components/TextEditor/TextEditor"
import { BlocksConfigProps } from "../../../types/BlockConfig.types"

export function TextConfig({
  handleAddBlock,
  isOpen,
  onClose,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
}: BlocksConfigProps) {
  const text = useTranslation().t

  const [content, setContent] = useState("")
  const [saveAs, setSaveAs] = useState<string>("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateContent(content: string) {
    setContent(content)
    handleUpdateIsUpdating(true)
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
    handleUpdateContent("")
    handleUpdateIsUpdating(false)
    handleUpdateRunUpdate(false)
    handleUpdateSaveAs("")
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: v4(),
      type: "text",
      data: content,
      save_as: saveAs,
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
          onClick={() => onClose()}
        />,
      ]
    }
  }

  const handleOpenVariablePanelForText = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent(content ? `${content}${variable}` : variable)
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForSaveAs = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateSaveAs(saveAs ? `${saveAs}${variable}` : variable)
      })
    handleOpenVariablePanel()
  }

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title={text("textconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="flex flex-col justify-center gap-[0.375rem] h-fit py-[16px]
    bg-white min-w-[100%] rounded-[20px] lg:rounded-[30px] lg:gap-[0.75rem]"
          >
            <TextEditor
              content={content}
              onChange={handleUpdateContent}
              handleOpenVariablePanelForText={handleOpenVariablePanelForText}
            />
            <CardLine />
          </div>
          <Card>
            <CardText label={text("poolconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("poolconfig:saveaslabel"),
                onChange: (e) => handleUpdateSaveAs(e),
                inputValue: saveAs,
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForSaveAs,
              }}
            />
          </Card>
          {isUpdating && (
            <>
              <div className="w-full h-fit hidden xl:block">
                <Button
                  block={{
                    data: {
                      color: "bg-white",
                      text: text("textconfig:addblock"),
                      onClick: () => handleUpdateRunUpdate(true),
                    },
                  }}
                  isEditable={false}
                />
              </div>
            </>
          )}

          <div className="w-full h-fit hidden xl:block">
            <Button
              block={{
                data: {
                  color: "bg-white",
                  text: text("textconfig:cancel"),
                  onClick: () => handleClosing(),
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
