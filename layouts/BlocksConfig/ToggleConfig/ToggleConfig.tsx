import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "components/Dialog/Dialog"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import { useValidation, validationRules } from "hooks/useValidation"
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

  type ToggleProps = {
    description?: string
    on_label?: string
    off_label?: string
    save_as?: string
  }

  const [
    localBlockData,
    setLocalBlockData,
    LocalBlockDataErrors,
    isLocalBlockDataValid,
  ] = useValidation<ToggleProps>({
    description: {
      initialValue: blockData?.data?.description || "",
      validators: [],
    },
    on_label: {
      initialValue: blockData?.data?.on_label || "",
      validators: [],
    },
    off_label: {
      initialValue: blockData?.data?.off_label || "",
      validators: [],
    },
    save_as: {
      initialValue: "",
      validators: [
        validationRules.required(text("validation:required")),
        validationRules.custom(
          text("createtemplate:saveas"),
          handleCheckSaveAs,
          [blockData?.save_as]
        ),
      ],
    },
  })

  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)
  const [hasDataChanged, setHasDataChanged] = useState(false)

  function handleUpdateLocalBlockData(newBlockData: ToggleProps) {
    setLocalBlockData({ ...localBlockData, ...newBlockData })
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function checkIfDataHasChanged() {
    if (blockData) {
      let hasDataChanged = false
      if (blockData?.data?.description !== localBlockData?.description) {
        hasDataChanged = true
      }
      if (blockData?.data?.off_label !== localBlockData?.off_label) {
        hasDataChanged = true
      }
      if (blockData?.data?.on_label !== localBlockData?.on_label) {
        hasDataChanged = true
      }
      if (blockData?.save_as !== localBlockData?.save_as) {
        hasDataChanged = true
      }
      return hasDataChanged
    } else {
      return false
    }
  }

  function handleClosing() {
    setLocalBlockData({
      description: "",
      on_label: "",
      off_label: "",
      save_as: "",
    })
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    setHasDataChanged(false)
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: blockData?.id || undefined,
      type: "toggle",
      save_as: localBlockData.save_as,
      data: {
        description: localBlockData.description,
        on_label: localBlockData.on_label,
        off_label: localBlockData.off_label,
      },
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
            text={
              blockData ? text("toggleconfig:update") : text("toggleconfig:add")
            }
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
        handleUpdateLocalBlockData({
          description: localBlockData?.description
            ? `${localBlockData?.description}${variable}`
            : variable,
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForOn = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateLocalBlockData({
          on_label: localBlockData?.on_label
            ? `${localBlockData?.on_label}${variable}`
            : variable,
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForOff = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateLocalBlockData({
          off_label: localBlockData?.off_label
            ? `${localBlockData?.off_label}${variable}`
            : variable,
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForSaveAs = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateLocalBlockData({
          save_as: localBlockData.save_as
            ? `${localBlockData.save_as}${variable}`
            : variable,
        })
      })
    handleOpenVariablePanel()
  }

  useEffect(() => {
    if (blockData) {
      setLocalBlockData({
        description: blockData?.data?.description,
        on_label: blockData?.data?.on_label,
        off_label: blockData?.data?.off_label,
        save_as: blockData.save_as,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockData])

  useEffect(() => {
    if (runUpdate && isLocalBlockDataValid) {
      if (!blockData) {
        onAddBlock()
      } else {
        if (checkIfDataHasChanged()) {
          onAddBlock()
        }
      }
    } else if (runUpdate && !isLocalBlockDataValid) {
      setHasDataChanged(true)
      handleUpdateRunUpdate(false)
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  useEffect(() => {
    if (blockData) {
      if (checkIfDataHasChanged() && isLocalBlockDataValid) {
        handleUpdateIsUpdating(true)
      } else {
        handleUpdateIsUpdating(false)
      }
    } else {
      if (isLocalBlockDataValid) {
        handleUpdateIsUpdating(true)
      } else {
        handleUpdateIsUpdating(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localBlockData, isLocalBlockDataValid])

  return (
    <>
      <Dialog isOpen={isOpen} title={text("toggleconfig:toptitle")}>
        <div className="flex flex-col gap-3 items-center">
          <Card>
            <CardText label={text("toggleconfig:description")} />
            <CardTextInput
              input={{
                label: text("toggleconfig:descriptionlabel"),
                value: localBlockData?.description,
                onChange: (description) => {
                  handleUpdateLocalBlockData({ description: description })
                },
                errors: hasDataChanged ? LocalBlockDataErrors.description : [],
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
                value: localBlockData?.on_label,
                onChange: (label) => {
                  handleUpdateLocalBlockData({ on_label: label })
                },
                errors: hasDataChanged ? LocalBlockDataErrors.on_label : [],
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
                value: localBlockData?.off_label,
                onChange: (label) => {
                  handleUpdateLocalBlockData({ off_label: label })
                },
                errors: hasDataChanged ? LocalBlockDataErrors.off_label : [],
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
                value: localBlockData.save_as,
                onChange: (value) =>
                  handleUpdateLocalBlockData({ save_as: value }),
                errors: hasDataChanged ? LocalBlockDataErrors.save_as : [],
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
                    text: blockData
                      ? text("toggleconfig:updateblock")
                      : text("toggleconfig:addblock"),
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
