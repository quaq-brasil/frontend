import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "components/Dialog/Dialog"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { useEffect, useState } from "react"
import { BlocksConfigProps } from "types/BlockConfig.types"

export function ToggleConfig({
  handleAddBlock,
  isOpen,
  onClose,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
  handleCheckSaveAs,
  blockData,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type IToggle = {
    description?: string
    on_label?: string
    off_label?: string
  }

  type FormDataProps = {
    description?: {
      valid?: boolean
    }
    save_as?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    description: {
      valid: false,
    },
    save_as: {
      valid: false,
    },
  })
  const [content, setContent] = useState<IToggle>()
  const [save_as, set_save_as] = useState<string>()
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

  function handleUpdateContent(newData: IToggle) {
    setContent((state) => {
      return {
        ...state,
        ...newData,
      } as IToggle
    })
  }

  function handleUpdateSaveAs(value: string) {
    set_save_as(value)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleClosing() {
    handleUpdateContent({})
    set_save_as(undefined)
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: blockData?.id || undefined,
      type: "toggle",
      save_as: save_as,
      data: content,
    })
    handleClosing()
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("toggleconfig:cancel")}
          onClick={() => handleClosing()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("toggleconfig:add")}
            onClick={() => onAddBlock()}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("toggleconfig:cancel")}
          onClick={() => handleClosing()}
        />,
      ]
    }
  }

  const handleOpenVariablePanelForDescription = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({
          description: content?.description
            ? `${content?.description}${variable}`
            : variable,
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForOn = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({
          on_label: content?.on_label
            ? `${content?.on_label}${variable}`
            : variable,
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForOff = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({
          off_label: content?.off_label
            ? `${content?.off_label}${variable}`
            : variable,
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForSaveAs = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateSaveAs(save_as ? `${save_as}${variable}` : variable)
      })
    handleOpenVariablePanel()
  }

  useEffect(() => {
    if (save_as) {
      if (blockData) {
        if (blockData.save_as == save_as) {
          handleUpdateFormData({ save_as: { valid: true } })
        } else {
          const isValid = handleCheckSaveAs(save_as)
          handleUpdateFormData({ save_as: { valid: isValid } })
        }
      } else {
        const isValid = handleCheckSaveAs(save_as)
        handleUpdateFormData({ save_as: { valid: isValid } })
      }
    } else {
      handleUpdateFormData({ save_as: { valid: false } })
    }
    if (content?.description) {
      handleUpdateFormData({ description: { valid: true } })
    } else {
      handleUpdateFormData({ description: { valid: false } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [save_as, content])

  useEffect(() => {
    if (blockData) {
      setContent(blockData.data)
      set_save_as(blockData.save_as)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockData])

  useEffect(() => {
    if (content && save_as) {
      onAddBlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  useEffect(() => {
    if (formData.description?.valid && formData.save_as?.valid) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
  }, [formData])

  return (
    <>
      <Dialog isOpen={isOpen} title={text("toggleconfig:toptitle")}>
        <div className="flex flex-col gap-3 items-center">
          <Card>
            <CardText label={text("toggleconfig:description")} />
            <CardTextInput
              input={{
                label: text("toggleconfig:descriptionlabel"),
                inputValue: content?.description,
                onChange: (description) => {
                  handleUpdateContent({ description: description })
                },
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForDescription,
              }}
            />
          </Card>
          <Card>
            <CardText label={text("toggleconfig:on")} />
            <CardTextInput
              input={{
                label: text("toggleconfig:onlabel"),
                inputValue: content?.on_label,
                onChange: (label) => {
                  handleUpdateContent({ on_label: label })
                },
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForOn,
              }}
            />
          </Card>
          <Card>
            <CardText label={text("toggleconfig:off")} />
            <CardTextInput
              input={{
                label: text("toggleconfig:offlabel"),
                inputValue: content?.off_label,
                onChange: (label) => {
                  handleUpdateContent({ off_label: label })
                },
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForOff,
              }}
            />
          </Card>

          <Card>
            <CardText label={text("toggleconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("toggleconfig:saveaslabel"),
                inputValue: save_as,
                onChange: (value) => handleUpdateSaveAs(value),
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
                  text: text("toggleconfig:cancel"),
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
                    text: text("toggleconfig:addblock"),
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
