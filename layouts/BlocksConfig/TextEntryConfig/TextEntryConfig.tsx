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
  handleCheckSaveAs,
  blockData,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type ITextEntry = {
    placeholder?: string
    type?: string
  }

  type FormDataProps = {
    placeholder?: {
      valid?: boolean
    }
    saveAs?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    placeholder: {
      valid: false,
    },
    saveAs: {
      valid: false,
    },
  })
  const [content, setContent] = useState<ITextEntry>({
    type: "email",
    placeholder: "",
  })
  const [saveAs, setSaveAs] = useState<string | null>()
  const [runUpdate, setRunUpdate] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  function handleUpdateFormData(newData: FormDataProps) {
    setFormData((state) => {
      return {
        ...state,
        ...newData,
      } as FormDataProps
    })
  }

  function handleUpdateContent(newData: ITextEntry) {
    setContent((state) => {
      return {
        ...state,
        ...newData,
      } as ITextEntry
    })
  }

  function handleUpdateSaveAs(value: typeof saveAs) {
    setSaveAs(value)
    const isValid = handleCheckSaveAs(value)
    handleUpdateFormData({ saveAs: { valid: isValid } })
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleClosing() {
    handleUpdateContent({})
    setSaveAs(undefined)
    handleUpdateRunUpdate(false)
    handleUpdateFormData({
      placeholder: {
        valid: false,
      },
      saveAs: {
        valid: false,
      },
    })
    onClose()
    setContent({ type: "email" })
  }

  function onAddBlock() {
    handleAddBlock({
      id: blockData?.id || undefined,
      type: "textentry",
      save_as: saveAs as string,
      data: content,
    })
    handleClosing()
  }

  useEffect(() => {
    if (blockData) {
      setContent(blockData.data)
      setSaveAs(blockData.save_as as string)
      handleUpdateFormData({
        placeholder: { valid: true },
        saveAs: { valid: true },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockData])

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
        handleUpdateContent({
          placeholder: content.placeholder
            ? `${content.placeholder}${variable}`
            : variable,
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

  useEffect(() => {
    if (formData.placeholder?.valid && formData.saveAs?.valid) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
  }, [formData])

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title={text("textentryconfig:toptitle")}
        onClose={() => {}}
      >
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("textentryconfig:placeholder")} />
            <CardTextInput
              input={{
                label: text("textentryconfig:placeholderlabel"),
                inputValue: content.placeholder,
                onChange: (placeholder) => {
                  handleUpdateContent({ placeholder: placeholder })
                  if (placeholder.length > 0) {
                    handleUpdateFormData({ placeholder: { valid: true } })
                  } else {
                    handleUpdateFormData({ placeholder: { valid: false } })
                  }
                },
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
                onChange: (value) => handleUpdateSaveAs(value),
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
