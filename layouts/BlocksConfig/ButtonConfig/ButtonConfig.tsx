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
  handleCheckSaveAs,
  blockData,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type IButton = {
    text?: string
    color?: string
  }

  type FormDataProps = {
    text?: {
      valid?: boolean
    }
    saveAs?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    text: {
      valid: false,
    },
    saveAs: {
      valid: false,
    },
  })
  const [content, setContent] = useState<IButton>({
    color: "bg-black",
    text: "",
  })
  const [saveAs, setSaveAs] = useState<string | null>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateFormData(newData: FormDataProps) {
    setFormData((state) => {
      return {
        ...state,
        ...newData,
      } as FormDataProps
    })
  }

  function handleUpdateContent(newData: IButton) {
    setContent((state) => {
      return {
        ...state,
        ...newData,
      } as IButton
    })
  }

  function handleUpdateSaveAs(value: typeof saveAs) {
    setSaveAs(value)
    const isValid = handleCheckSaveAs(value)
    handleUpdateFormData({ saveAs: { valid: isValid } })
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleClosing() {
    handleUpdateContent({})
    setSaveAs(null)
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    handleUpdateFormData({
      text: {
        valid: false,
      },
      saveAs: {
        valid: false,
      },
    })
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: blockData?.id || undefined,
      type: "button",
      save_as: saveAs,
      data: content,
    })
    handleClosing()
  }

  useEffect(() => {
    if (blockData) {
      setContent(blockData.data)
      setSaveAs(blockData.save_as)
      handleUpdateFormData({ saveAs: { valid: true }, text: { valid: true } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockData])

  useEffect(() => {
    if (content && saveAs) {
      onAddBlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  useEffect(() => {
    if (formData.text?.valid && formData.saveAs?.valid) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
  }, [formData])

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
        handleUpdateContent({
          text: content?.text ? `${content?.text}${variable}` : variable,
        })
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
        title={text("buttonconfig:toptitle")}
        onClose={() => {}}
      >
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("buttonconfig:text")} />
            <CardTextInput
              input={{
                label: text("buttonconfig:textlabel"),
                onChange: (text) => {
                  handleUpdateContent({ text: text })
                  if (text.length > 0) {
                    handleUpdateFormData({ text: { valid: true } })
                  } else {
                    handleUpdateFormData({ text: { valid: false } })
                  }
                },
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
              currentColor={content.color}
            />
          </Card>
          <Card>
            <CardText label={text("buttonconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("buttonconfig:saveaslabel"),
                onChange: (e) => handleUpdateSaveAs(e),
                inputValue: saveAs || "",
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForSaveAs,
              }}
            />
            {!formData.saveAs?.valid && (
              <p className="w-full lg:text-[1.1rem] text-center">
                {text("createtemplate:saveas")}
              </p>
            )}
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
