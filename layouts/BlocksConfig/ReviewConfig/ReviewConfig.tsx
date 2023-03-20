import { Button } from "components/Button/Button"
import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { useEffect, useState } from "react"

import { Card } from "components/Card/Card"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "components/Dialog/Dialog"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import { BlocksConfigProps } from "types/BlockConfig.types"

export function ReviewConfig({
  handleAddBlock,
  isOpen,
  onClose,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
  handleCheckSaveAs,
  blockData,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type FormDataProps = {
    description?: {
      valid?: boolean
    }
    saveAs?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    description: {
      valid: false,
    },
    saveAs: {
      valid: false,
    },
  })
  const [saveAs, setSaveAs] = useState<string>()
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

  function handleUpdateSaveAs(value: string) {
    setSaveAs(value)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleClosing() {
    setSaveAs(undefined)
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: blockData?.id || undefined,
      type: "review",
      save_as: saveAs,
      data: {},
    })
    handleClosing()
  }

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

  const handleOpenVariablePanelForSaveAs = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateSaveAs(saveAs ? `${saveAs}${variable}` : variable)
      })
    handleOpenVariablePanel()
  }

  useEffect(() => {
    if (saveAs) {
      if (blockData) {
        if (blockData.save_as == saveAs) {
          handleUpdateFormData({ saveAs: { valid: true } })
        } else {
          const isValid = handleCheckSaveAs(saveAs)
          handleUpdateFormData({ saveAs: { valid: isValid } })
        }
      } else {
        const isValid = handleCheckSaveAs(saveAs)
        handleUpdateFormData({ saveAs: { valid: isValid } })
      }
    } else {
      handleUpdateFormData({ saveAs: { valid: false } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveAs])

  useEffect(() => {
    if (blockData) {
      setSaveAs(blockData.save_as)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockData])

  useEffect(() => {
    if (saveAs) {
      onAddBlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  useEffect(() => {
    if (formData.description?.valid && formData.saveAs?.valid) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
  }, [formData])

  return (
    <>
      <Dialog isOpen={isOpen} title={text("reviewconfig:toptitle")}>
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("reviewconfig:title2")} />
            <CardTextInput
              input={{
                label: text("reviewconfig:label2"),
                inputValue: saveAs,
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
                  text: text("reviewconfig:cancel"),
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
                    text: text("reviewconfig:addblock"),
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
