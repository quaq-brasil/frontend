import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "components/Dialog/Dialog"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import { useValidation, validationRules } from "hooks/useValidation"
import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, X } from "phosphor-react"
import { useEffect, useState } from "react"
import { BlocksConfigProps } from "types/BlockConfig.types"

export function DropDownMenuConfig({
  handleAddBlock,
  isOpen,
  onClose,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
  handleCheckSaveAs,
  blockData,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type options = {
    id?: number
    value?: string
  }

  type PoolProps = {
    options?: options[]
    save_as?: string
  }

  const [
    localBlockData,
    setLocalBlockData,
    LocalBlockDataErrors,
    isLocalBlockDataValid,
  ] = useValidation<PoolProps>({
    options: {
      initialValue: [{ id: 0, value: "" }],
      validators: [validationRules.required(text("validation:required"))],
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

  function handleUpdateLocalBlockData(newBlockData: PoolProps) {
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
      if (blockData?.data?.options !== localBlockData?.options) {
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
      options: [{ id: 0, value: "" }],
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
      type: "dropdownmenu",
      save_as: localBlockData.save_as,
      data: {
        options: localBlockData.options,
      },
    })
    handleClosing()
  }

  type HandleUpdateOptionsProps = {
    id?: number
    value?: string
    option: string
  }

  function handleUpdateOptions({
    id,
    option,
    value,
  }: HandleUpdateOptionsProps) {
    const options = [...(localBlockData.options || [])]

    if (option === "add") {
      options.push({ id: options.length, value: "" })
    } else if (option === "remove") {
      const index = options.findIndex((option) => option.id === id)
      if (index !== -1) {
        options.splice(index, 1)
      }
    } else if (option === "update") {
      const index = options.findIndex((option) => option.id === id)
      if (index !== -1) {
        options[index].value = value
      }
    }

    handleUpdateLocalBlockData({ options })
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("dropdownmenu:cancel")}
          onClick={() => handleClosing()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={
              blockData ? text("dropdownmenu:update") : text("dropdownmenu:add")
            }
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("dropdownmenu:cancel")}
          onClick={() => handleClosing()}
        />,
      ]
    }
  }

  const handleOpenVariablePanelForOption = ({
    option,
    id,
  }: HandleUpdateOptionsProps) => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: string) => {
        handleUpdateOptions({ option, id, value: variable })
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
        options: blockData.data.options,
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
      <Dialog isOpen={isOpen} title={text("dropdownmenu:toptitle")}>
        <div className="flex flex-col items-center gap-3 scrollbar-hide">
          <>
            {localBlockData.options &&
              localBlockData?.options.map((option, index) => (
                <Card key={option.id}>
                  <CardText
                    label={`${text("dropdownmenu:option")} ${index + 1}`}
                    indicator={{
                      icon: X,
                    }}
                    onClick={() =>
                      handleUpdateOptions({ id: index, option: "remove" })
                    }
                  />
                  <CardTextInput
                    input={{
                      label: text("dropdownmenu:optionlabel"),
                      onChange: (value) =>
                        handleUpdateOptions({
                          id: index,
                          option: "update",
                          value: value,
                        }),
                      defaultValue: option.value,
                      value: option.value,
                    }}
                    indicator={{
                      icon: BracketsCurly,
                      onClick: () =>
                        handleOpenVariablePanelForOption({
                          option: "update",
                          id: index,
                        }),
                    }}
                  />
                </Card>
              ))}
          </>
          <Tag
            variant="txt"
            text={text("dropdownmenu:addoption")}
            onClick={() => handleUpdateOptions({ option: "add" })}
          />
          <Card>
            <CardText label={text("dropdownmenu:saveas")} />
            <CardTextInput
              input={{
                label: text("dropdownmenu:saveaslabel"),
                onChange: (e) => handleUpdateLocalBlockData({ save_as: e }),
                value: localBlockData.save_as,
                errors: localBlockData.save_as
                  ? LocalBlockDataErrors.save_as
                  : [],
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
                  text: text("dropdownmenu:cancel"),
                  onClick: () => handleClosing(),
                },
              }}
              isEditable={false}
            />
          </div>
          {isUpdating && (
            <>
              <div className="w-full h-fit hidden xl:block">
                <Button
                  block={{
                    data: {
                      color: "bg-white",
                      text: blockData
                        ? text("dropdownmenu:updateblock")
                        : text("dropdownmenu:addblock"),
                      onClick: () => handleUpdateRunUpdate(true),
                    },
                  }}
                  isEditable={false}
                />
              </div>
            </>
          )}
        </div>
        <TabBar isHidden={true} tags={handleTabBar()} />
      </Dialog>
    </>
  )
}
